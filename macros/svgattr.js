/*
  Parameters:
  0 - Attribute name
  */
export function renderMacro(args, env) {
  const baseURL = "https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute";
  const slug = args[0];

  return `<a href="${baseURL}/${slug}"><code>${slug}</code></a>`;
}
