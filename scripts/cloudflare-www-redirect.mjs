#!/usr/bin/env node
/**
 * The www to apex redirect.
 *
 * Cloudflare has two products that redirect, and they sit in two different
 * phases of the ruleset engine:
 *
 *   http_request_redirect         Bulk Redirects, an Enterprise feature
 *   http_request_dynamic_redirect Single Redirects, on every plan
 *
 * Asking a normal zone for the first phase is answered with "phase
 * http_request_redirect not allowed at zone level", which is not a
 * permissions problem: the zone is simply not an Enterprise one. This
 * script uses the second phase.
 *
 * The two phases also take the rule in different shapes. Bulk Redirects
 * carries the source and the target in action_parameters.from and
 * action_parameters.to. Single Redirects carries the target in
 * action_parameters.from_value.target_url, and what the rule matches is the
 * expression on the rule itself.
 *
 * The script is idempotent. It looks for its own rule by reference first,
 * and when the phase already has an entry point ruleset it updates that one
 * instead of creating a second, keeping the rules that are not its own.
 *
 * The token needs the Zone > Single Redirect > Edit permission, which the
 * API lists as "Dynamic URL Redirects Write".
 *
 * Run: CLOUDFLARE_API_TOKEN=... node scripts/cloudflare-www-redirect.mjs calccents.com
 */

const API = 'https://api.cloudflare.com/client/v4';

/** The phase that Single Redirects live in. */
const PHASE = 'http_request_dynamic_redirect';

/** The reference of the rule this script owns, so it can find it again. */
const RULE_REF = 'redirect_www_to_apex';

const token = process.env.CLOUDFLARE_API_TOKEN;
const domain = process.argv[2] ?? process.env.DOMAIN;

if (!token) {
  console.error('CLOUDFLARE_API_TOKEN is not set.');
  process.exit(2);
}

if (!domain) {
  console.error('No domain given. Pass it as an argument or set DOMAIN.');
  process.exit(2);
}

/**
 * One call to the API. The body is returned even when the call failed, so
 * that the error messages Cloudflare wrote can be printed.
 */
async function api(path, init = {}) {
  const response = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, body };
}

/** The zone of the domain, or null when the account has no such zone. */
async function findZone() {
  const { body } = await api(`/zones?name=${encodeURIComponent(domain)}`);
  return body.result?.[0] ?? null;
}

/**
 * The rule this script owns: www to the apex, with the query string kept.
 */
function buildRule() {
  return {
    ref: RULE_REF,
    expression: `http.host eq "www.${domain}"`,
    description: 'Send www to the apex domain',
    action: 'redirect',
    action_parameters: {
      from_value: {
        target_url: {
          value: `https://${domain}`,
        },
        status_code: 301,
        preserve_query_string: true,
      },
    },
  };
}

/**
 * The rules of a ruleset without the fields the API owns. Sending an id
 * back is refused, and a version is the API's business.
 */
function cleanRule(rule) {
  const { id, version, last_updated, ...rest } = rule;
  return rest;
}

async function main() {
  const zone = await findZone();
  if (!zone) {
    console.log(`No zone named ${domain} in this account, nothing to do.`);
    return;
  }
  console.log(`zone: ${zone.name} (${zone.id})`);

  const entry = await api(`/zones/${zone.id}/rulesets/phases/${PHASE}/entrypoint`);
  const existing = entry.ok ? entry.body.result : null;

  const rule = buildRule();

  if (!existing) {
    console.log(`No ruleset in the ${PHASE} phase yet, creating one.`);
    const created = await api(`/zones/${zone.id}/rulesets`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Redirect rules ruleset',
        kind: 'zone',
        phase: PHASE,
        rules: [rule],
      }),
    });
    if (!created.ok) {
      console.error(`::warning::The redirect could not be created, www will still serve the site directly.`);
      for (const error of created.body.errors ?? []) {
        console.error(`  ${error.code}: ${error.message}`);
      }
      return;
    }
    console.log(`redirect created: ruleset ${created.body.result.id}`);
    return;
  }

  const rules = (existing.rules ?? []).map(cleanRule);
  const index = rules.findIndex((entry) => entry.ref === RULE_REF);

  if (index === -1) {
    rules.push(rule);
    console.log('The ruleset has no rule of ours yet, adding one.');
  } else {
    rules[index] = rule;
    console.log('The ruleset already has our rule, refreshing it.');
  }

  const updated = await api(`/zones/${zone.id}/rulesets/${existing.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: existing.name ?? 'Redirect rules ruleset',
      kind: 'zone',
      phase: PHASE,
      rules,
    }),
  });

  if (!updated.ok) {
    console.error(`::warning::The redirect could not be updated, www will still serve the site directly.`);
    for (const error of updated.body.errors ?? []) {
      console.error(`  ${error.code}: ${error.message}`);
    }
    return;
  }

  console.log(`redirect updated: ruleset ${updated.body.result.id}, ${updated.body.result.rules.length} rule(s)`);
}

main().catch((error) => {
  console.error(`::warning::The redirect step failed: ${error?.message ?? error}`);
});
