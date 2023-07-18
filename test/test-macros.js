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
  deprecated_inline:
    '<abbr class="icon icon-deprecated" title="Deprecated. Not for use in new websites."><span class="visually-hidden">Deprecated</span></abbr>',
  domxref: {
    "one-argument-interface":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window"><code>Window</code></a>',
    "one-argument-interface-member":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Request/json"><code>Request.json()</code></a>',
    "corrects-interface-case":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Document"><code>document</code></a>',
    "custom-display-name":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto">My crypto</a>',
    fragment:
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Event#examples">examples</a>',
    nocode:
      '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element">Element</a>',
  },
  experimental_inline:
    '<abbr class="icon icon-experimental" title="Experimental. Expect behavior to change in the future."><span class="visually-hidden">Experimental</span></abbr>',
  glossary: {
    "one-argument":
      '<a href="https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting">Fingerprinting</a>',
    "custom-display-name":
      '<a href="https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting">another name</a>',
  },
  htmlelement: {
    "one-argument":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div"><code>&lt;div&gt;</code></a>',
    "custom-display-name":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span">The span element</a>',
    fragment:
      '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary#examples"><code>&lt;summary&gt;</code></a>',
  },
  httpheader: {
    "one-argument":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/RTT"><code>RTT</code></a>',
    "custom-display-name":
      '<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/RTT"><code>My text</code></a>',
    fragment:
      '<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/RTT#examples"><code>My text.examples</code></a>',
    nocode:
      '<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/RTT">RTT</a>',
  },
  "non-standard_inline":
    '<abbr class="icon icon-nonstandard" title="Non-standard. Check cross-browser support before using."><span class="visually-hidden">Non-standard</span></abbr>',
  optional_inline: '<span class="badge inline optional">Optional</span>',
  rfc: {
    "one-argument":
      '<a href="https://datatracker.ietf.org/doc/html/rfc1234">RFC 1234</a>',
    "additional-link-text":
      '<a href="https://datatracker.ietf.org/doc/html/rfc1234">RFC 1234: my extra stuff</a>',
    "link-to-section":
      '<a href="https://datatracker.ietf.org/doc/html/rfc1950#section-4">RFC 1950, section 4: my extra stuff</a>',
  },
  svgattr:
    '<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/end"><code>end</code></a>',
  svgelement:
    '<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate"><code>&lt;animate&gt;</code></a>',
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
  // deprecated_inline
  describe("deprecated_inline", () => {
    it("generates markup", () =>
      assert.equal(
        processors["deprecated_inline"](),
        expected["deprecated_inline"]
      ));
  });
  // domxref
  describe("domxref", () => {
    it("works with 1 argument", () =>
      assert.equal(
        processors["domxref"](["Window"]),
        expected["domxref"]["one-argument-interface"]
      ));
    it("creates links to subpages", () =>
      assert.equal(
        processors["domxref"](["Request.json()"]),
        expected["domxref"]["one-argument-interface-member"]
      ));
    it("corrects interface case", () =>
      assert.equal(
        processors["domxref"](["document"]),
        expected["domxref"]["corrects-interface-case"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        processors["domxref"](["Crypto", "My crypto", "", "nocode"]),
        expected["domxref"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        processors["domxref"](["Event", "examples", "examples", "nocode"]),
        expected["domxref"]["fragment"]
      ));
    it("can suppress code formatting", () =>
      assert.equal(
        processors["domxref"](["Element", "", "", "nocode"]),
        expected["domxref"]["nocode"]
      ));
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
  // glossary
  describe("glossary", () => {
    it("works with 1 argument", () =>
      assert.equal(
        processors["glossary"](["Fingerprinting"]),
        expected["glossary"]["one-argument"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        processors["glossary"](["Fingerprinting", "another name"]),
        expected["glossary"]["custom-display-name"]
      ));
  });
  // htmlelement
  describe("htmlelement", () => {
    it("works with 1 argument", () =>
      assert.equal(
        processors["htmlelement"](["div"]),
        expected["htmlelement"]["one-argument"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        processors["htmlelement"](["span", "The span element"]),
        expected["htmlelement"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        processors["htmlelement"](["summary", "", "#examples"]),
        expected["htmlelement"]["fragment"]
      ));
  });
  // httpheader
  describe("httpheader", () => {
    it("works with 1 argument", () =>
      assert.equal(
        processors["httpheader"](["RTT"]),
        expected["httpheader"]["one-argument"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        processors["httpheader"](["RTT", "My text"]),
        expected["httpheader"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        processors["httpheader"](["RTT", "My text", "examples"]),
        expected["httpheader"]["fragment"]
      ));
    it("can suppress code formatting", () =>
      assert.equal(
        processors["httpheader"](["RTT", "", "", "nocode"]),
        expected["httpheader"]["nocode"]
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
  // optional_inline
  describe("optional_inline", () => {
    it("generates markup", () =>
      assert.equal(
        processors["optional_inline"](),
        expected["optional_inline"]
      ));
  });
  // rfc
  describe("rfc", () => {
    it("works with 1 argument", () =>
      assert.equal(processors["rfc"]([1234]), expected["rfc"]["one-argument"]));
    it("supports additional link text", () =>
      assert.equal(
        processors["rfc"]([1234, "my extra stuff"]),
        expected["rfc"]["additional-link-text"]
      ));
    it("supports linking to sections", () =>
      assert.equal(
        processors["rfc"]([1950, "my extra stuff", 4]),
        expected["rfc"]["link-to-section"]
      ));
  });
  // seecompattable
  describe("seecompattable", () => {
    it("strips macro", () => assert.equal(processors["seecompattable"](), ""));
  });
  // svgattr
  describe("svgattr", () => {
    it("works with 1 argument", () =>
      assert.equal(processors["svgattr"](["end"]), expected["svgattr"]));
  });
  // svgelement
  describe("svgelement", () => {
    it("works with 1 argument", () =>
      assert.equal(
        processors["svgelement"](["animate"]),
        expected["svgelement"]
      ));
  });
});
