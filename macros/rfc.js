/*
  Parameters:
  0 - RFC number to which to link.
  1 - (Optional) Additional link text, to be used to add a name for the RFC
  2 - (Optional) Section number within the RTC to link to
  */
export function executeMacro(args, frontMatter) {
  const baseURL = "https://datatracker.ietf.org/doc/html/rfc";

  let additionalLinkText = "";
  let rfcReference = args[0];

  if (args[1]) {
    additionalLinkText = `: ${args[1]}`;
  }

  if (args[2]) {
    rfcReference = `${rfcReference}#section-${args[2]}`;
    additionalLinkText = `, section ${args[2]}${additionalLinkText}`;
  }

  return `<a href="${baseURL}${rfcReference}">RFC ${args[0]}${additionalLinkText}</a>`;
}
