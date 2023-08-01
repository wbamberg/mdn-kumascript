/*
  Parameters:
  0 - Attribute name
  */
export function renderMacro(args, env) {
  const baseURL = "/Web/SVG/Attribute";
  const slug = args[0];

  return `<a href="${baseURL}/${slug}"><code>${slug}</code></a>`;
}
