#!/usr/bin/env node
/**
 * The www address of the site.
 *
 * Two things live here:
 *
 *   1. The DNS record of www, a CNAME to the Pages project, proxied.
 *   2. The redirect rule that sends www to the apex with a 301.
 *
 * The rule lives in the Single Redirects phase,
 * "http_request_dynamic_redirect", which is the phase a normal zone has.
 * The other redirect phase, "http_request_redirect", is Bulk Redirects, an
 * Enterprise feature, and asking a normal zone for it is answered with
 * "phase http_request_redirect not allowed at zone level".
 *
 * The rule is written in the shape the phase takes, which puts the target
 * in action_parameters.from_value.target_url and lets the expression on the
 * rule say what the rule matches. A rule that is already in the phase is
 * never rebuilt in another shape: only the target is changed, so a rule
 * that came from the dashboard keeps the form it was made in.
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
 * The www record: a CNAME to the Pages project, proxied. The CNAME points
 * at the project and not at the apex, so that the request for www is a
 * request for www all the way to the edge and the host of the request is
 * the one the redirect rule matches on.
 */
async function ensureWwwRecord(zone) {
  const name = `www.${domain}`;
  const target = `${domain.split('.')[0]}.pages.dev`;

  const list = await api(`/zones/${zone.id}/dns_records?name=${encodeURIComponent(name)}`);
  const records = list.body.result ?? [];
  const record = records.find((entry) => entry.type === 'CNAME' && entry.name === name);

  if (record && record.content === target && record.proxied) {
    console.log(`The www record already points at ${target}.`);
    return;
  }

  if (record) {
    console.log(`The www record points at ${record.content}, moving it to ${target}.`);
    const updated = await api(`/zones/${zone.id}/dns_records/${record.id}`, {
      method: 'PUT',
      body: JSON.stringify({ type: 'CNAME', name, content: target, proxied: true, ttl: 1 }),
    });
    if (!updated.ok) {
      console.error(`::warning::The www record could not be moved, it still points at ${record.content}.`);
      for (const error of updated.body.errors ?? []) {
        console.error(`  ${error.code}: ${error.message}`);
      }
      return;
    }
    console.log(`The www record now points at ${target}.`);
    return;
  }

  console.log(`Creating the www record: CNAME www -> ${target}.`);
  const created = await api(`/zones/${zone.id}/dns_records`, {
    method: 'POST',
    body: JSON.stringify({ type: 'CNAME', name: 'www', content: target, proxied: true, ttl: 1 }),
  });
  if (!created.ok) {
    console.error(`::warning::The www record could not be created.`);
    for (const error of created.body.errors ?? []) {
      console.error(`  ${error.code}: ${error.message}`);
    }
    return;
  }
  console.log(`The www record now points at ${target}.`);
}

/** Whether a rule of the phase already sends www to the apex. */
function isOurRule(rule) {
  if (rule.ref === RULE_REF) {
    return true;
  }
  const parameters = rule.action_parameters ?? {};
  const host = parameters.from?.value?.http_request?.host?.matches;
  if (host === `www.${domain}`) {
    return true;
  }
  return typeof rule.expression === 'string' && rule.expression.includes(`www.${domain}`);
}

/**
 * The target of the redirect.
 *
 * A static target sends every request to one address, and the path of the
 * request is lost on the way: /tools/income-tax/ would land on the front
 * page. The target is therefore an expression, which is what a redirect
 * rule carries when it is to keep the path.
 *
 * The path of the request is matched with the wildcard "/*", which leaves
 * the path itself in the first capture group, and the path is put back onto
 * the apex. The query string is kept by the rule itself.
 */
function targetUrl() {
  return `concat("https://${domain}", wildcard_replace(http.request.uri.path, "/*", "/\${1}"))`;
}

/**
 * The rule this script owns: www to the apex, with the path and the query
 * string kept.
 *
 * The target goes in action_parameters.from_value.target_url, and the
 * expression on the rule says what the rule matches.
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
          expression: targetUrl(),
        },
        status_code: 301,
        preserve_query_string: true,
      },
    },
  };
}

/**
 * The target of a rule, wherever the rule keeps it. A rule that came from
 * the dashboard may keep it in another place, and the rule is not rebuilt
 * in another shape: only the target is changed.
 */
function setTarget(rule) {
  const parameters = rule.action_parameters ?? {};

  if (parameters.from_value?.target_url) {
    // The target is an expression. A rule that kept a plain value is given
    // the expression in its place.
    parameters.from_value.target_url = { expression: targetUrl() };
    return 'from_value.target_url.expression';
  }
  if (parameters.to?.value?.url) {
    parameters.to.value.url.value = targetUrl();
    return 'to.url';
  }
  return null;
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

  await ensureWwwRecord(zone);

  const rule = buildRule();

  const entry = await api(`/zones/${zone.id}/rulesets/phases/${PHASE}/entrypoint`);
  let entrypoint = entry.ok ? entry.body.result : null;

  if (!entrypoint) {
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

    // A ruleset that is not the entry point of its phase is never executed,
    // so the entry point is read back and the rule is written into it.
    const after = await api(`/zones/${zone.id}/rulesets/phases/${PHASE}/entrypoint`);
    entrypoint = after.ok ? after.body.result : null;
    if (!entrypoint) {
      console.error(`::warning::The ruleset was created but the phase has no entry point, so the rule would never run.`);
      return;
    }
    if (entrypoint.id !== created.body.result.id) {
      console.log(`The entry point of the phase is another ruleset (${entrypoint.id}), writing the rule into it.`);
    }
  } else {
    console.log(`entry point: ${entrypoint.id} (${entrypoint.kind}, ${entrypoint.phase})`);
  }

  const rules = (entrypoint.rules ?? []).map(cleanRule);
  const index = rules.findIndex(isOurRule);

  if (index === -1) {
    rules.push(rule);
    console.log('The ruleset has no rule of ours yet, adding one.');
  } else {
    const where = setTarget(rules[index]);
    if (where) {
      console.log(`The ruleset already has our rule, moving the target to ${where}.`);
    } else {
      rules[index] = rule;
      console.log('The ruleset already has our rule in a shape this script does not know, replacing it.');
    }
  }

  const updated = await api(`/zones/${zone.id}/rulesets/${entrypoint.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: entrypoint.name ?? 'Redirect rules ruleset',
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

  // What the phase holds, read back from the API. A rule that is in a
  // ruleset but does not run is usually a rule whose shape the phase does
  // not take, and this is where that shows.
  const check = await api(`/zones/${zone.id}/rulesets/phases/${PHASE}/entrypoint`);
  if (check.ok) {
    console.log(`phase holds ${check.body.result.rules.length} rule(s):`);
    for (const stored of check.body.result.rules ?? []) {
      console.log(`  ref=${stored.ref ?? '(none)'} action=${stored.action} expression=${stored.expression ?? '(none)'}`);
      console.log(`  parameters=${JSON.stringify(stored.action_parameters)}`);
    }
  }
}

main().catch((error) => {
  console.error(`::warning::The redirect step failed: ${error?.message ?? error}`);
});
