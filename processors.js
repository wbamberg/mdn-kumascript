import { executeMacro as cssxrefProcessor } from "./macros/cssxref.js";
import { executeMacro as embedInteractiveExampleProcessor } from "./macros/embedinteractiveexample.js";
import { executeMacro as experimentalInlineProcessor } from "./macros/experimental_inline.js";
import { executeMacro as nonStandardInlineProcessor } from "./macros/non-standard_inline.js";

function stripMacro() {
  return "";
}

export const processors = {
  compat: stripMacro,
  cssinfo: stripMacro,
  cssref: stripMacro,
  cssxref: cssxrefProcessor,
  csssyntax: stripMacro,
  deprecated_header: stripMacro,
  embedinteractiveexample: embedInteractiveExampleProcessor,
  experimental_inline: experimentalInlineProcessor,
  "non-standard_header": stripMacro,
  "non-standard_inline": nonStandardInlineProcessor,
  seecompattable: stripMacro,
  specifications: stripMacro,
};
