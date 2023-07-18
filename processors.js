import { executeMacro as cssxrefProcessor } from "./macros/cssxref.js";
import { executeMacro as deprecatedInlineProcessor } from "./macros/deprecated_inline.js";
import { executeMacro as domxrefProcessor } from "./macros/domxref.js";
import { executeMacro as embedInteractiveExampleProcessor } from "./macros/embedinteractiveexample.js";
import { executeMacro as experimentalInlineProcessor } from "./macros/experimental_inline.js";
import { executeMacro as glossaryProcessor } from "./macros/glossary.js";
import { executeMacro as htmlelementProcessor } from "./macros/htmlelement.js";
import { executeMacro as nonStandardInlineProcessor } from "./macros/non-standard_inline.js";
import { executeMacro as optionalInlineProcessor } from "./macros/optional_inline.js";
import { executeMacro as svgattrProcessor } from "./macros/svgattr.js";
import { executeMacro as svgelementProcessor } from "./macros/svgelement.js";

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
  deprecated_inline: deprecatedInlineProcessor,
  domxref: domxrefProcessor,
  embedinteractiveexample: embedInteractiveExampleProcessor,
  experimental_inline: experimentalInlineProcessor,
  glossary: glossaryProcessor,
  htmlelement: htmlelementProcessor,
  "non-standard_header": stripMacro,
  "non-standard_inline": nonStandardInlineProcessor,
  optional_inline: optionalInlineProcessor,
  seecompattable: stripMacro,
  specifications: stripMacro,
  svgattr: svgattrProcessor,
  svgelement: svgelementProcessor,
};
