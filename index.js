import { Macro } from "./macros.js";

const macroRegex = RegExp("{{.*?}}", "g");

export function processLine(input, frontMatter) {
  let lower = input.toLowerCase();
  let match;
  const output = {
    markup: input,
    frontMatter,
  };

  output.markup = input.replaceAll(macroRegex, (match) => {
    const macro = new Macro(match);
    return macro.process(frontMatter);
  });
  return output;
}
