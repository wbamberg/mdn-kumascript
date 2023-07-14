import { executeMacro as cssxrefProcessor } from "./macros/cssxref.js";
import { executeMacro as embedInteractiveExampleProcessor } from "./macros/embedinteractiveexample.js";
import { executeMacro as experimentalInlineProcessor } from "./macros/experimental_inline.js";
import { executeMacro as nonStandardInlineProcessor } from "./macros/non-standard_inline.js";

function stripMacro() {
  return "";
}

export const processors = {
  cssref: stripMacro,
  deprecated_header: stripMacro,
  "non-standard_header": stripMacro,
  seecompattable: stripMacro,
  cssxref: cssxrefProcessor,
  embedinteractiveexample: embedInteractiveExampleProcessor,
  experimental_inline: experimentalInlineProcessor,
  "non-standard_inline": nonStandardInlineProcessor,
};
