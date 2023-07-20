import { renderMacro as cssxrefRenderer } from "./macros/cssxref.js";
import { renderMacro as deprecatedinlineRenderer } from "./macros/deprecated_inline.js";
import { renderMacro as domxrefRenderer } from "./macros/domxref.js";
import { renderMacro as embedinteractiveexampleRenderer } from "./macros/embedinteractiveexample.js";
import { renderMacro as embedghlivesampleRenderer } from "./macros/embedghlivesample.js";
import { renderMacro as experimentalinlineRenderer } from "./macros/experimental_inline.js";
import { renderMacro as glossaryRenderer } from "./macros/glossary.js";
import { renderMacro as htmlelementRenderer } from "./macros/htmlelement.js";
import { renderMacro as httpheaderRenderer } from "./macros/httpheader.js";
import { renderMacro as nonstandardinlineRenderer } from "./macros/non-standard_inline.js";
import { renderMacro as optionalinlineRenderer } from "./macros/optional_inline.js";
import { renderMacro as rfcRenderer } from "./macros/rfc.js";
import { renderMacro as svgattrRenderer } from "./macros/svgattr.js";
import { renderMacro as svgelementRenderer } from "./macros/svgelement.js";
import { renderMacro as xrefcsscomputedRenderer } from "./macros/xref_csscomputed.js";
import { renderMacro as xrefcssinheritedRenderer } from "./macros/xref_cssinherited.js";
import { renderMacro as xrefcssinitialRenderer } from "./macros/xref_cssinitial.js";

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
  deprecated_inline: deprecatedinlineRenderer,
  domxref: domxrefRenderer,
  embedinteractiveexample: embedinteractiveexampleRenderer,
  embedghlivesample: embedghlivesampleRenderer,
  embedlivesample: stripMacro, // obviously this needs to be implemented...
  experimental_inline: experimentalinlineRenderer,
  glossary: glossaryRenderer,
  htmlelement: htmlelementRenderer,
  httpheader: httpheaderRenderer,
  "non-standard_header": stripMacro,
  "non-standard_inline": nonstandardinlineRenderer,
  optional_inline: optionalinlineRenderer,
  rfc: rfcRenderer,
  seecompattable: stripMacro,
  specifications: stripMacro,
  svgattr: svgattrRenderer,
  svgelement: svgelementRenderer,
  xref_csscomputed: xrefcsscomputedRenderer,
  xref_cssinherited: xrefcssinheritedRenderer,
  xref_cssinitial: xrefcssinitialRenderer,
};
