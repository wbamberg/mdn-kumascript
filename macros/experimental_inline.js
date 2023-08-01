export function renderMacro(args, env) {
  const title = "Experimental. Expect behavior to change in the future.";
  const abbreviation = "Experimental";
  return `<abbr class="icon icon-experimental" title="${title}"><span class="visually-hidden">${abbreviation}</span></abbr>`;
}
