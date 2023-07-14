import { processors } from "./processors.js";

const macroRegex = RegExp("{{.*?}}", "g");

const macroParser =
  /{{(?<macroname>[a-zA-Z\-_0-9\ ]*)(?<macroargs>\(.*?\))? ?}}/;

class Macro {
  constructor(macroInit) {
    this.match = macroInit.toLowerCase();
    const parsed = this.match.match(macroParser);
    this.name = parsed[1].trim();
    this.args = [];
    if (parsed[2]) {
      this.args = parsed[2]
        .slice(1, -1)
        .split(",")
        .map((s) => s.replaceAll(/[\"\']/g, "").trim());
    }
  }

  process(frontMatter) {
    let expansion = this.match;
    if (Object.keys(processors).includes(this.name)) {
      expansion = processors[this.name](this.args, frontMatter);
    }
    return expansion;
  }
}

export function processMacros(input, frontMatter) {
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
