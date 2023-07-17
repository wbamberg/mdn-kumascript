/**
 * The Templates class is a thin wrapper around the EJS templating system.
 *
 * Given a directory in the local filesystem, it finds all .ejs (and
 * also .js and .json) files under that directory and assumes that
 * they are all valid EJS templates. It uses the lowercase filename,
 * with path and extension removed as a unique identifier for the
 * macro. (The constructor raises an error if macro names are not
 * unique within the directory.)
 *
 * The render() method takes the name of a template and an execution
 * context object and renders the named template in that context. (See
 * the getExecutionContext() method of the Environment object to obtain
 * an execution context.) render() is declared async, so it returns
 * Promise<string> rather than returning a string directly, which
 * supports templates that are themselves async.
 *
 * render() relies on EJS's built-in caching and file-loading
 * capabilities so no template should ever need to be loaded or
 * compiled more than once.
 *
 * The getTemplateMap() function returns a Map object that maps
 * template names to the name of the file that implements the
 * template (this is used by the /macros/ endpoint in server.js)
 */

import { processors } from "../processors.js";

export default class Templates {
  async render(name, env?: any) {
    // Normalize the macro name by converting colons to hyphens and
    // uppercase letters to lowercase.
    name = name.replace(/:/g, "-").toLowerCase();
    try {
      const rendered = processors[name](env.args, env.frontMatter);
      return rendered.trim();
    } catch (error) {
      console.error(`The ${name} macro failed to render.`, error);
      throw error;
    }
  }
}
