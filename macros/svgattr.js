/*
  Parameters:
  0 - Attribute name
  */
export function renderMacro(args, frontMatter) {
  const baseURL = "/Web/SVG/Attribute";
  const slug = args[0];

  return `<a href="${baseURL}/${slug}"><code>${slug}</code></a>`;
}
