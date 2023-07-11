import { executeMacro as cssxrefProcessor } from "./macros/cssxref.js";
import { executeMacro as embedInteractiveExampleProcessor } from "./macros/embedinteractiveexample.js";
import { executeMacro as experimentalInlineProcessor } from "./macros/experimental_inline.js";

const processors = {
  cssxref: cssxrefProcessor,
  embedinteractiveexample: embedInteractiveExampleProcessor,
  experimental_inline: experimentalInlineProcessor,
};

const macroParser =
  /{{(?<macroname>[a-zA-Z\-_0-9\ ]*)(?<macroargs>\(.*?\))? ?}}/;

export class Macro {
  constructor(macroInit) {
    this.input = macroInit.input;
    this.index = macroInit.index;
    this.match = macroInit[0];
    const parsed = macroInit[0].match(macroParser);
    this.name = parsed[1].trim();
    this.args = [];
    if (parsed[2]) {
      this.args = parsed[2]
        .slice(1, -1)
        .split(",")
        .map((s) => s.replaceAll(/[\"\']/g, "").trim());
    }
  }
  process(output) {
    let expansion = "";
    if (Object.keys(processors).includes(this.name)) {
      expansion = processors[this.name](this.args, output.frontMatter);
    }
    // splice in the expansion
    const pre = output.markup.slice(0, this.index);
    const post = output.markup.slice(this.index + this.match.length);
    output.markup = `${pre}${expansion}${post}`;
  }
}
