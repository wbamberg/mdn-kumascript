import assert from "assert";

import { processors } from "../processors.js";

const expected = {
  cssref: "",
  cssxref: {
    "special-case-color":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value"><code>&lt;color&gt;</code></a>',
    "data-type-argument": "",
    "function-with-brackets": "",
    "function-without-brackets": "",
    "data-type-with-brackets": "",
    "data-type-without-brackets": "",
    "custom-display-name": "",
    fragment: "",
  },
  deprecated_header: "",
  embedinteractiveexample: "",
  experimental_inline:
    '<abbr class="icon icon-experimental" title="Experimental. Expect behavior to change in the future."><span class="visually-hidden">Experimental</span></abbr>',
  "non-standard_header": "",
  seecompattable: "",
  "non-standard_inline":
    '<abbr class="icon icon-nonstandard" title="Non-standard. Check cross-browser support before using."><span class="visually-hidden">Non-standard</span></abbr>',
};

/*
export const processors = {
  cssxref: cssxrefProcessor,
  "non-standard_inline": nonStandardInlineProcessor,
};
*/

describe("Macro unit tests", () => {
  it("Testing macro: cssxref", () =>
    assert.equal(
      processors["cssxref"](["&lt;color&gt;"], {
        "page-type": "css-data-type",
      }),
      expected["cssxref"]["special-case-color"]
    ));
  it("Testing macro: deprecated_header", () =>
    assert.equal(
      processors["deprecated_header"](),
      expected["deprecated_header"]
    ));
  it("Testing macro: embedinteractiveexample", () => {
    const frontMatter = {};
    const result = processors["embedinteractiveexample"](
      ["thing"],
      frontMatter
    );
    assert.equal(result, expected["embedinteractiveexample"]);
    assert.equal(
      frontMatter["interactive-example"],
      "https://interactive-examples.mdn.mozilla.net/thing"
    );
  });
  it("Testing macro: experimental_inline", () =>
    assert.equal(
      processors["experimental_inline"](),
      expected["experimental_inline"]
    ));
  it("Testing macro: non-standard_inline", () =>
    assert.equal(
      processors["non-standard_inline"](),
      expected["non-standard_inline"]
    ));
});
