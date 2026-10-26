/**
 * A small template helper for the page scripts.
 *
 * The page passes a sentence with a placeholder to the script through a data
 * attribute, and the script fills the placeholder in. It is the same
 * substitution the server-side dictionaries use, kept here so a page script
 * does not have to pull a whole dictionary into the browser to use it.
 */

/** Replace every `{name}` in a template with the value for that name. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? values[key] : match,
  );
}
