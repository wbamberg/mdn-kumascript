import assert from "assert";
import { processMacros } from "../index.js";

const input = `<p>The {{cssxref("margin")}} property and the {{experimental_inline}} and also the {{cssref}} thing, and also the {{embedinteractiveexample("the-link")}}, and even the {{cssxref("border", "border syntax", "#syntax)}}</p>`;
const expectedMarkup = `<p>The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin"><code>margin</code></a> property and the <abbr class="icon icon-experimental" title="Experimental. Expect behavior to change in the future."><span class="visually-hidden">Experimental</span></abbr> and also the  thing, and also the , and even the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border#syntax"><code>border syntax</code></a></p>`;

const expectedFrontMatter = {
  "interactive-example":
    "https://interactive-examples.mdn.mozilla.net/the-link",
};

describe("Macro unit tests", () => {
  const output = processMacros(input, {});
  it("updates markup", () => assert.equal(output.markup, expectedMarkup));
  it("updates front matter", () =>
    assert.equal(
      output.frontMatter["interactive-example"],
      expectedFrontMatter["interactive-example"]
    ));
});
