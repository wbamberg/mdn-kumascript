/*
  Parameters:
  0 - Element name
  */
export function renderMacro(args, frontMatter) {
  const baseURL = "/Web/SVG/Element";
  const slug = args[0];
  const displayName = `&lt;${slug}&gt;`;

  return `<a href="${baseURL}/${slug}"><code>${displayName}</code></a>`;
}
