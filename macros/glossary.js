/*
  Parameters:
  0 - Term name
  1 - Text to display (optional)
  */
export function renderMacro(args, env) {
  const baseURL = "/Glossary";

  const displayName = args[1] || args[0];
  const subPath = args[0].replace(/\s+/g, "_");

  return `<a href="${baseURL}/${subPath}">${displayName}</a>`;
}
