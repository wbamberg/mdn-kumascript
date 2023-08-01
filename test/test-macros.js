import assert from "assert";

import { renderers } from "../renderers.js";

const expected = {
  cssxref: {
    "special-case-color":
      '<a href="/Web/CSS/color_value"><code>&lt;color&gt;</code></a>',
    "add-brackets-to-function": '<a href="/Web/CSS/max"><code>max()</code></a>',
    "add-brackets-to-data-type":
      '<a href="/Web/CSS/angle"><code>&lt;angle&gt;</code></a>',
    "custom-display-name":
      '<a href="/Web/CSS/color"><code>this color</code></a>',
    fragment: '<a href="/Web/CSS/border#syntax"><code>border</code></a>',
  },
  deprecated_inline:
    '<abbr class="icon icon-deprecated" title="Deprecated. Not for use in new websites."><span class="visually-hidden">Deprecated</span></abbr>',
  domxref: {
    "one-argument-interface":
      '<a href="/Web/API/Window"><code>Window</code></a>',
    "one-argument-interface-member":
      '<a href="/Web/API/Request/json"><code>Request.json()</code></a>',
    "corrects-interface-case":
      '<a href="/Web/API/Document"><code>document</code></a>',
    "custom-display-name": '<a href="/Web/API/Crypto">My crypto</a>',
    fragment: '<a href="/Web/API/Event#examples">examples</a>',
    nocode: '<a href="/Web/API/Element">Element</a>',
  },
  embedghlivesample: {
    "one-argument": '<iframe src="https://mdn.github.io/my-example"></iframe>',
    width:
      '<iframe width="100" src="https://mdn.github.io/my-example"></iframe>',
    height:
      '<iframe height="200" src="https://mdn.github.io/my-example"></iframe>',
    "width-height": `<iframe width="100" height="200" src="https://mdn.github.io/my-example"></iframe>`,
  },
  experimental_inline:
    '<abbr class="icon icon-experimental" title="Experimental. Expect behavior to change in the future."><span class="visually-hidden">Experimental</span></abbr>',
  glossary: {
    "one-argument": '<a href="/Glossary/Fingerprinting">Fingerprinting</a>',
    "custom-display-name":
      '<a href="/Glossary/Fingerprinting">another name</a>',
  },
  htmlelement: {
    "one-argument":
      '<a href="/Web/HTML/Element/div"><code>&lt;div&gt;</code></a>',
    "custom-display-name":
      '<a href="/Web/HTML/Element/span">The span element</a>',
    fragment:
      '<a href="/Web/HTML/Element/summary#examples"><code>&lt;summary&gt;</code></a>',
  },
  httpheader: {
    "one-argument": '<a href="/Web/HTTP/Headers/RTT"><code>RTT</code></a>',
    "custom-display-name":
      '<a href="/Web/HTTP/Headers/RTT"><code>My text</code></a>',
    fragment:
      '<a href="/Web/HTTP/Headers/RTT#examples"><code>My text.examples</code></a>',
    nocode: '<a href="/Web/HTTP/Headers/RTT">RTT</a>',
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
  svgattr: '<a href="/Web/SVG/Attribute/end"><code>end</code></a>',
  svgelement:
    '<a href="/Web/SVG/Element/animate"><code>&lt;animate&gt;</code></a>',
  xref_csscomputed: '<a href="/Web/CSS/computed_value">Computed value</a>',
  xref_cssinherited: '<a href="/Web/CSS/inheritance">Inherited</a>',
  xref_cssinitial: '<a href="/Web/CSS/initial_value">Initial value</a>',
};

describe("Macro unit tests", () => {
  // cssref
  describe("cssref", () => {
    it("strips macro", () => assert.equal(renderers["cssref"](), ""));
  });
  // cssxref
  describe("cssxref", () => {
    it("special-cases <color> type", () =>
      assert.equal(
        renderers["cssxref"](["&lt;color&gt;"], {
          frontMatter: {
            "page-type": "css-type",
          },
        }),
        expected["cssxref"]["special-case-color"]
      ));
    it("adds brackets to functions", () =>
      assert.equal(
        renderers["cssxref"](["max"], {
          frontMatter: {
            "page-type": "css-function",
          },
        }),
        expected["cssxref"]["add-brackets-to-function"]
      ));
    it("adds brackets to data types", () =>
      assert.equal(
        renderers["cssxref"](["angle"], {
          frontMatter: {
            "page-type": "css-type",
          },
        }),
        expected["cssxref"]["add-brackets-to-data-type"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        renderers["cssxref"](["color", "this color"], {
          frontMatter: {
            "page-type": "css-property",
          },
        }),
        expected["cssxref"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        renderers["cssxref"](["border", "", "#syntax"], {
          frontMatter: {
            "page-type": "css-property",
          },
        }),
        expected["cssxref"]["fragment"]
      ));
  });
  // deprecated_header
  describe("deprecated_header", () => {
    it("strips macro", () =>
      assert.equal(renderers["deprecated_header"](), ""));
  });
  // deprecated_inline
  describe("deprecated_inline", () => {
    it("generates markup", () =>
      assert.equal(
        renderers["deprecated_inline"](),
        expected["deprecated_inline"]
      ));
  });
  // domxref
  describe("domxref", () => {
    it("works with 1 argument", () =>
      assert.equal(
        renderers["domxref"](["Window"]),
        expected["domxref"]["one-argument-interface"]
      ));
    it("creates links to subpages", () =>
      assert.equal(
        renderers["domxref"](["Request.json()"]),
        expected["domxref"]["one-argument-interface-member"]
      ));
    it("corrects interface case", () =>
      assert.equal(
        renderers["domxref"](["document"]),
        expected["domxref"]["corrects-interface-case"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        renderers["domxref"](["Crypto", "My crypto", "", "nocode"]),
        expected["domxref"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        renderers["domxref"](["Event", "examples", "examples", "nocode"]),
        expected["domxref"]["fragment"]
      ));
    it("can suppress code formatting", () =>
      assert.equal(
        renderers["domxref"](["Element", "", "", "nocode"]),
        expected["domxref"]["nocode"]
      ));
  });
  // embedghlivesample
  describe("embedghlivesample", () => {
    it("works with 1 argument", () =>
      assert.equal(
        renderers["embedghlivesample"](["my-example"]),
        expected["embedghlivesample"]["one-argument"]
      ));
    it("supports setting width only", () =>
      assert.equal(
        renderers["embedghlivesample"](["my-example", 100]),
        expected["embedghlivesample"]["width"]
      ));
    it("supports setting height only", () =>
      assert.equal(
        renderers["embedghlivesample"](["my-example", "", 200]),
        expected["embedghlivesample"]["height"]
      ));
    it("supports setting width and height", () =>
      assert.equal(
        renderers["embedghlivesample"](["my-example", 100, 200]),
        expected["embedghlivesample"]["width-height"]
      ));
  });
  // embedinteractiveexample
  describe("embedinteractiveexample", () => {
    it("strips macro, appends to front matter", () => {
      const env = {
        frontMatter: {},
      };
      const result = renderers["embedinteractiveexample"](["thing"], env);
      assert.equal(result, "");
      assert.equal(
        env.frontMatter["interactive-example"],
        "https://interactive-examples.mdn.mozilla.net/thing"
      );
    });
  });
  // experimental_inline
  describe("experimental_inline", () => {
    it("generates markup", () =>
      assert.equal(
        renderers["experimental_inline"](),
        expected["experimental_inline"]
      ));
  });
  // glossary
  describe("glossary", () => {
    it("works with 1 argument", () =>
      assert.equal(
        renderers["glossary"](["Fingerprinting"]),
        expected["glossary"]["one-argument"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        renderers["glossary"](["Fingerprinting", "another name"]),
        expected["glossary"]["custom-display-name"]
      ));
  });
  // htmlelement
  describe("htmlelement", () => {
    it("works with 1 argument", () =>
      assert.equal(
        renderers["htmlelement"](["div"]),
        expected["htmlelement"]["one-argument"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        renderers["htmlelement"](["span", "The span element"]),
        expected["htmlelement"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        renderers["htmlelement"](["summary", "", "#examples"]),
        expected["htmlelement"]["fragment"]
      ));
  });
  // httpheader
  describe("httpheader", () => {
    it("works with 1 argument", () =>
      assert.equal(
        renderers["httpheader"](["RTT"]),
        expected["httpheader"]["one-argument"]
      ));
    it("supports custom display names", () =>
      assert.equal(
        renderers["httpheader"](["RTT", "My text"]),
        expected["httpheader"]["custom-display-name"]
      ));
    it("supports fragments", () =>
      assert.equal(
        renderers["httpheader"](["RTT", "My text", "examples"]),
        expected["httpheader"]["fragment"]
      ));
    it("can suppress code formatting", () =>
      assert.equal(
        renderers["httpheader"](["RTT", "", "", "nocode"]),
        expected["httpheader"]["nocode"]
      ));
  });
  // non-standard_header
  describe("non-standard_header", () => {
    it("strips macro", () =>
      assert.equal(renderers["non-standard_header"](), ""));
  });
  // non-standard_inline
  describe("non-standard_inline", () => {
    it("generates markup", () =>
      assert.equal(
        renderers["non-standard_inline"](),
        expected["non-standard_inline"]
      ));
  });
  // optional_inline
  describe("optional_inline", () => {
    it("generates markup", () =>
      assert.equal(
        renderers["optional_inline"](),
        expected["optional_inline"]
      ));
  });
  // rfc
  describe("rfc", () => {
    it("works with 1 argument", () =>
      assert.equal(renderers["rfc"]([1234]), expected["rfc"]["one-argument"]));
    it("supports additional link text", () =>
      assert.equal(
        renderers["rfc"]([1234, "my extra stuff"]),
        expected["rfc"]["additional-link-text"]
      ));
    it("supports linking to sections", () =>
      assert.equal(
        renderers["rfc"]([1950, "my extra stuff", 4]),
        expected["rfc"]["link-to-section"]
      ));
  });
  // seecompattable
  describe("seecompattable", () => {
    it("strips macro", () => assert.equal(renderers["seecompattable"](), ""));
  });
  // svgattr
  describe("svgattr", () => {
    it("works with 1 argument", () =>
      assert.equal(renderers["svgattr"](["end"]), expected["svgattr"]));
  });
  // svgelement
  describe("svgelement", () => {
    it("works with 1 argument", () =>
      assert.equal(
        renderers["svgelement"](["animate"]),
        expected["svgelement"]
      ));
  });
  // xref_csscomputed
  describe("xref_csscomputed", () => {
    it("renders the link", () =>
      assert.equal(
        renderers["xref_csscomputed"](),
        expected["xref_csscomputed"]
      ));
  });
  // xref_cssinherited
  describe("xref_cssinherited", () => {
    it("renders the link", () =>
      assert.equal(
        renderers["xref_cssinherited"](),
        expected["xref_cssinherited"]
      ));
  });
  // xref_csscomputed
  describe("xref_cssinitial", () => {
    it("renders the link", () =>
      assert.equal(
        renderers["xref_cssinitial"](),
        expected["xref_cssinitial"]
      ));
  });
});
