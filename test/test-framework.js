import assert from "assert";
import { render } from "../dist/render.js";

const input = `<p>The {{cssxref("margin")}} property and the {{experimental_inline}} and also the {{cssref}} thing, and also the {{embedinteractiveexample("the-link")}}, and even the {{cssxref("border", "border syntax", "#syntax")}}</p>`;
const environment = { frontMatter: {} };

const expectedMarkup = `<p>The <a href="/Web/CSS/margin"><code>margin</code></a> property and the <abbr class="icon icon-experimental" title="Experimental. Expect behavior to change in the future."><span class="visually-hidden">Experimental</span></abbr> and also the  thing, and also the , and even the <a href="/Web/CSS/border#syntax"><code>border syntax</code></a></p>`;

const expectedFrontMatter = {
  "interactive-example":
    "https://interactive-examples.mdn.mozilla.net/the-link",
};

describe("Macro framework tests", () => {
  try {
    it("updates markup", async () => {
      const output = await render(input, environment);
      assert.equal(output[0], expectedMarkup);
    });
    it("updates front matter", async () => {
      await render(input, environment);
      assert.equal(
        environment.frontMatter["interactive-example"],
        expectedFrontMatter["interactive-example"]
      );
    });
  } catch (e) {
    console.error(e);
  }
});
