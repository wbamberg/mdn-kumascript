import { renderMacro as cssxrefRenderer } from "./macros/cssxref.js";
import { renderMacro as deprecatedInlineRenderer } from "./macros/deprecated_inline.js";
import { renderMacro as domxrefRenderer } from "./macros/domxref.js";
import { renderMacro as embedInteractiveExampleRenderer } from "./macros/embedinteractiveexample.js";
import { renderMacro as experimentalInlineRenderer } from "./macros/experimental_inline.js";
import { renderMacro as glossaryRenderer } from "./macros/glossary.js";
import { renderMacro as htmlelementRenderer } from "./macros/htmlelement.js";
import { renderMacro as httpheaderRenderer } from "./macros/httpheader.js";
import { renderMacro as nonStandardInlineRenderer } from "./macros/non-standard_inline.js";
import { renderMacro as optionalInlineRenderer } from "./macros/optional_inline.js";
import { renderMacro as rfcRenderer } from "./macros/rfc.js";
import { renderMacro as svgattrRenderer } from "./macros/svgattr.js";
import { renderMacro as svgelementRenderer } from "./macros/svgelement.js";

function stripMacro() {
  return "";
}

export const renderers = {
  compat: stripMacro,
  cssinfo: stripMacro,
  cssref: stripMacro,
  cssxref: cssxrefRenderer,
  csssyntax: stripMacro,
  deprecated_header: stripMacro,
  deprecated_inline: deprecatedInlineRenderer,
  domxref: domxrefRenderer,
  embedinteractiveexample: embedInteractiveExampleRenderer,
  experimental_inline: experimentalInlineRenderer,
  glossary: glossaryRenderer,
  htmlelement: htmlelementRenderer,
  httpheader: httpheaderRenderer,
  "non-standard_header": stripMacro,
  "non-standard_inline": nonStandardInlineRenderer,
  optional_inline: optionalInlineRenderer,
  rfc: rfcRenderer,
  seecompattable: stripMacro,
  specifications: stripMacro,
  svgattr: svgattrRenderer,
  svgelement: svgelementRenderer,
};
