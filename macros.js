import { executeMacro as cssxrefProcessor } from "./macros/cssxref.js";
import { executeMacro as embedInteractiveExampleProcessor } from "./macros/embedinteractiveexample.js";
import { executeMacro as experimentalInlineProcessor } from "./macros/experimental_inline.js";

function stripMacro() {
  return "";
}

const processors = {
  cssref: stripMacro,
  cssxref: cssxrefProcessor,
  embedinteractiveexample: embedInteractiveExampleProcessor,
  experimental_inline: experimentalInlineProcessor,
};

const macroParser =
  /{{(?<macroname>[a-zA-Z\-_0-9\ ]*)(?<macroargs>\(.*?\))? ?}}/;

export class Macro {
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
