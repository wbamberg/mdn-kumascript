/* 
  Parameters:
  0 - The path of the page to link to, relative to the Web/API/ documentation path.
  1 - The text to use for the link.  If omitted, the value of the first parameter will be used
  2 - An anchor to link to on the page.
  3 - If set, do not put the domxref text in code
 */

export function renderMacro(args, env) {
  const baseURL = "/Web/API";

  let slug = args[0];
  let displayName = args[1] || args[0];

  slug = slug
    .replace(/ /g, "_")
    .replace(/\(\)/g, "")
    .replace(/\.prototype\./g, ".")
    .replace(/\./g, "/");

  slug = slug.charAt(0).toUpperCase() + slug.slice(1);

  let fragment = "";
  if (args[2]) {
    fragment = `#${args[2]}`;
  }

  if (!args[3]) {
    displayName = `<code>${displayName}</code>`;
  }

  return `<a href="${baseURL}/${slug}${fragment}">${displayName}</a>`;
}
