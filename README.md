# mdn-kumascript

This package processes KumaScript macros in a source string.

It includes modified versions of the KumaScript macros and KumaScript engine code in https://github.com/mdn/yari. This mdn/yari code is used under the [MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0/) license.

## Usage

```js
import { render } from "mdn-kumascript";

const source = `<p>The {{cssxref("margin")}} property and the {{experimental_inline}} note and also the {{cssref}} sidebar, and also the {{cssxref("border", "border syntax", "#syntax")}} property, and also the {{embedinteractiveexample("the-link")}}</p>`;
const environment = { frontMatter: {} };

const output = await render(source, environment);
console.log(output);

/*
{
  markup: '<p>The <a href="/Web/CSS/margin"><code>margin</code></a> property and the <abbr class="icon icon-experimental" title="Experimental. Expect behavior to change in the future."><span class="visually-hidden">Experimental</span></abbr> note and also the  sidebar, and also the <a href="/Web/CSS/border#syntax"><code>border syntax</code></a> property, and also the </p>',
  frontMatter: {
    'interactive-example': 'https://interactive-examples.mdn.mozilla.net/the-link'
  },
  errors: []
}
*/
```

## API

This package exports a single asynchronous function `render()`, which takes two arguments:

- `source`: a string that may contain KumaScript macros
- `environment`: an object with a single property `frontMatter`, which is an object containing the page front matter. At the moment, in fact, the front matter is not used as an input parameter, but some macros may need it later.

The function returns a `Promise` that resolves to an object with three properties:

- `markup`: a string representing the original `source`, but with macros expanded into HTML.
- `frontMatter`: the same front matter object that was passed in, with any modifications made by macros
- `errors`: an array of nonfatal errors encountered during macro processing.

## Internals

This package is really in two parts:

- the engine, that finds macro calls, arranges for the right macro to be called with the right arguments, and assembles the result.
- the individual macros

### Engine

The engine is ported from https://github.com/mdn/yari. In particular:

- parser.js, which parses the source to find macro calls and their arguments, is unchanged
- errors.ts, which implements error messages, is slightly modified to remove errors that seem to depend on the website
- render.ts, which orchestrates the invocation of macros for a given source, is modified top remove some features we don't need. This module implements the top-level `render()` function, so is the entry point to the module.
- templates.ts is mostly rewritten, as it forms the interface between the engine and individual macros, so the Yari version is highly dependent on the EJS implementation used in Yari.

### Macros

In this package, individual macros are implements as separate modules under the /macros directory. Each module must export an async function `executeMacro()`, which takes two arguments:

- `args`: an array containing the arguments that were passed to the macro in the source invocation
- `env`: an object containing a single property `frontMatter`, which is an object containing the page front matter (It's quite likely that some macros will eventually need more environment than this, so we will probably extend this `env` object).

The `executeMacro()` function returns a `Promise` that resolves to the expansion of the macro in the source. Macros may also modify the `frontMatter` argument: if they do, these modifications will appear in the object returned by the top level `render()` function.

After implementing a macro module, you make it available to the engine by adding its `executeMacro()` function to the `renderers` map in the `renderers.js` module.

## Testing

Tests are provided for both the framework and for individual macros. To run tests:

```bash
npm run test
```
