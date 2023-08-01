export function renderMacro(args, env) {
  const title = "Non-standard. Check cross-browser support before using.";
  const abbreviation = "Non-standard";
  return `<abbr class="icon icon-nonstandard" title="${title}"><span class="visually-hidden">${abbreviation}</span></abbr>`;
}
