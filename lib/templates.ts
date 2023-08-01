/**
 * This file contains a greatly modified version of the templates.ts
 * from https://github.com/mdn/yari/blob/main/kumascript/src/templates.ts.
 *
 * It exports a single function `render()`, which takes as arguments:
 * - `name`: the name of the macro to execute
 * - `env`: an object containing two properties:
 *   - `args`: an array of the arguments passed to the macro in the source
 *   - `frontMatter`: the page front matter
 */

import { renderers } from "../renderers.js";

export default class Templates {
  async render(name, args: [any], env: any) {
    // Normalize the macro name by converting colons to hyphens and
    // uppercase letters to lowercase.
    name = name.replace(/:/g, "-").toLowerCase();
    try {
      const rendered = renderers[name](args, env);
      return rendered.trim();
    } catch (error) {
      console.error(`The ${name} macro failed to render.`, error);
      throw error;
    }
  }
}
