/* 
  Parameters:
  0 - The path of the page to link to, relative to the Web/HTTP/Headers documentation path.
  1 - The text to use for the link.  If omitted, the value of the first parameter will be used.
  2 - An anchor to link to on the page.
  3 - If set, do not put the link text in code
 */

export function renderMacro(args, frontMatter) {
  const baseURL = "/Web/HTTP/Headers";

  const header = args[0];
  let linkText = args[1] || args[0];
  const url = `${baseURL}/${header}`;
  let fragment = "";

  if (args[2]) {
    linkText = `${linkText}.${args[2]}`;
    fragment = `#${args[2]}`;
  }

  if (!args[3]) {
    linkText = `<code>${linkText}</code>`;
  }
  return `<a href="${url}${fragment}">${linkText}</a>`;
}
