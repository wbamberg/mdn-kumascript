import assert from "assert";

import { processors } from "../processors.js";

const expected = {
  cssxref: {
    "special-case-color":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value"><code>&lt;color&gt;</code></a>',
    "add-brackets-to-function":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/max"><code>max()</code></a>',
    "add-brackets-to-data-type":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/angle"><code>&lt;angle&gt;</code></a>',
    "custom-display-name":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color"><code>this color</code></a>',
    fragment:
      '<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border#syntax"><code>border</code></a>',
  },
  experimental_inline:
    '<abbr class="icon icon-experimental" title="Experimental. Expect behavior to change in the future."><span class="visually-hidden">Experimental</span></abbr>',
  "non-standard_inline":
    '<abbr class="icon icon-nonstandard" title="Non-standard. Check cross-browser support before using."><span class="visually-hidden">Non-standard</span></abbr>',
};

describe("Macro unit tests", () => {
  // cssref
  describe("cssref", () => {
    it("strips macro", () => assert.equal(processors["cssref"](), ""));
  });
  // cssxref
  describe("cssxref", () => {
    it("special-cases <color> type", () =>
      assert.equal(
        processors["cssxref"](["&lt;color&gt;"], {
          "page-type": "css-type",
        }),
        expected["cssxref"]["special-case-color"]
      ));
    it("adds brackets to functions", () =>
      assert.equal(
        processors["cssxref"](["max"], {
          "page-type": "css-function",
        }),
        expected["cssxref"]["add-brackets-to-function"]
      ));
    it("adds brackets to data types", () =>
      assert.equal(
        processors["cssxref"](["angle"], {
          "page-type": "css-type",
        }),
        expected["cssxref"]["add-brackets-to-data-type"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        processors["cssxref"](["color", "this color"], {
          "page-type": "css-property",
        }),
        expected["cssxref"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        processors["cssxref"](["border", "", "#syntax"], {
          "page-type": "css-property",
        }),
        expected["cssxref"]["fragment"]
      ));
  });
  // deprecated_header
  describe("deprecated_header", () => {
    it("strips macro", () =>
      assert.equal(processors["deprecated_header"](), ""));
  });
  // embedinteractiveexample
  describe("embedinteractiveexample", () => {
    it("strips macro, appends to front matter", () => {
      const frontMatter = {};
      const result = processors["embedinteractiveexample"](
        ["thing"],
        frontMatter
      );
      assert.equal(result, "");
      assert.equal(
        frontMatter["interactive-example"],
        "https://interactive-examples.mdn.mozilla.net/thing"
      );
    });
  });
  // experimental_inline
  describe("experimental_inline", () => {
    it("generates markup", () =>
      assert.equal(
        processors["experimental_inline"](),
        expected["experimental_inline"]
      ));
  });
  // non-standard_header
  describe("non-standard_header", () => {
    it("strips macro", () =>
      assert.equal(processors["non-standard_header"](), ""));
  });
  // non-standard_inline
  describe("non-standard_inline", () => {
    it("generates markup", () =>
      assert.equal(
        processors["non-standard_inline"](),
        expected["non-standard_inline"]
      ));
  });
  // seecompattable
  describe("seecompattable", () => {
    it("strips macro", () => assert.equal(processors["seecompattable"](), ""));
  });
});
