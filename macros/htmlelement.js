/*
  Parameters:
  0 - Element name
  1 - Text to display (optional)
  2 - Anchor within the page (optional)
  */
export function renderMacro(args, env) {
  const baseURL = "/Web/HTML/Element";
  const slug = args[0];
  const fragment = args[2] || "";
  let displayName = args[1] || args[0];

  // code format and angled brackets if display name === page name (i.e. HTML element name)
  if (displayName === args[0]) {
    displayName = `<code>&lt;${displayName}&gt;</code>`;
  }

  return `<a href="${baseURL}/${slug}${fragment}">${displayName}</a>`;
}
