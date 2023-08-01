export function renderMacro(args, env) {
  const title = "Deprecated. Not for use in new websites.";
  const abbreviation = "Deprecated";
  return `<abbr class="icon icon-deprecated" title="${title}"><span class="visually-hidden">${abbreviation}</span></abbr>`;
}
