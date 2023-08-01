/**
 * This file contains a modified version of the render.ts from
 * https://github.com/mdn/yari/blob/main/kumascript/src/render.ts.
 *
 * It exports the `render()` function, that takes as input:
 * - `source`: a string containing KumaScript macro calls enclosed in
 * double curly brackets, like {{macrocall}}
 * - `pageEnvironment`: an object containing data relating to the page
 * that contains `source`. This object contains a single property
 * `frontMatter`, which is an object containing the front matter for
 * the page.
 *
 * The `render()` function is declared `async` because although the
 * function itself is synchronous, individual macros may be asynchronous.
 *
 * It returns an object containing three properties:
 * - `markup`: the markup which results from rendering all macros in `source`
 * - `frontMatter`: the front matter passed in, with any modifications made
 * by the macros that executed
 * - `errors`: an array of all nonfatal errors encountered
 *
 * It caches the results of macros, so it can reuse a macro result if the
 * source contains more than one identical macro invocation (except for
 * context-sensitive macros like embedlivesample).
 */
import * as Parser from "./parser.js";
import Templates from "./templates.js";
import {
  MacroInvocationError,
  MacroNotFoundError,
  MacroCompilationError,
  MacroExecutionError,
  MacroBrokenLinkError,
  MacroWrongXRefError,
  MacroDeprecatedError,
  MacroPagesError,
} from "./errors.js";

export function normalizeMacroName(name) {
  return name.replace(/:/g, "-").toLowerCase();
}

export async function render(
  source: string,
  pageEnvironment
): Promise<{ markup: string; frontMatter: {}; errors: MacroExecutionError[] }> {
  let tokens;
  try {
    tokens = Parser.parse(source);
  } catch (e) {
    // If there are any parsing errors in the input document
    // we can't process any of the macros. Return early with a MacroInvocationError
    // which contains useful information to the caller.
    // Note that rendering errors in the macros are different;
    // we handle these individually below.
    throw new MacroInvocationError(e, source);
  }

  const templates = new Templates();

  // Loop through the tokens, rendering the macros and collecting
  // the results. We detect duplicate invocations and only render
  // those once, on the assumption that their output will be the
  // same each time.
  let output = "";
  const errors = [];
  const signatureToResult = new Map();
  // This tracks the token for the "recordNonFatalError()" function.
  let currentToken;
  // This tracks the result object for the "recordNonFatalError()" function.
  let currentResult: {
    output: string;
    errors: {
      fatal: MacroExecutionError | null;
      nonFatal: MacroExecutionError[] | null;
    };
  };

  function recordNonFatalError(kind: string, message: string) {
    let NonFatalErrorClass;
    const args = [new Error(message), source, currentToken];
    if (kind === "deprecated") {
      NonFatalErrorClass = MacroDeprecatedError;
    } else if (kind === "broken-link") {
      NonFatalErrorClass = MacroBrokenLinkError;
    } else if (kind === "bad-pages") {
      NonFatalErrorClass = MacroPagesError;
    } else if (kind === "wrong-xref-macro") {
      NonFatalErrorClass = MacroWrongXRefError;
    } else {
      throw Error(`unsupported kind of non-fatal error requested: "${kind}"`);
    }
    const macroError: MacroExecutionError = new NonFatalErrorClass(...args);
    if (!currentResult.errors.nonFatal) {
      currentResult.errors.nonFatal = [];
    }
    currentResult.errors.nonFatal.push(macroError);
    return macroError;
  }

  const frontMatter = pageEnvironment.frontMatter;

  // Loop through the tokens
  for (const token of tokens) {
    // We only care about macros; skip anything else
    if (token.type !== "MACRO") {
      // If it isn't a MACRO token, it's a TEXT token.
      output += token.chars;
      continue;
    }

    const macroName = normalizeMacroName(token.name);

    // Check to see if we're already processing this exact
    // macro invocation. To do that we need a signature for
    // the macro. When the macro has json arguments we want to
    // ignore their order, so we do some tricky stringification
    // here in that case.
    if (token.args.length === 1 && typeof token.args[0] === "object") {
      // the json args case
      const keys = Object.keys(token.args[0]);
      keys.sort();
      token.signature = macroName + JSON.stringify(token.args[0], keys);
    } else {
      // the regular case: args is just an array of strings
      token.signature = macroName + JSON.stringify(token.args);
    }

    currentToken = token;
    currentResult = {
      output: null,
      errors: {
        fatal: null,
        nonFatal: null,
      },
    };

    // If the token signature is already in the map, then we've
    // already run the macro. We're only going to use the prior run if
    // there were no errors and if the macro isn't "EmbedLiveSample".
    // If there were errors in the prior run, let's re-run the macro in
    // order to capture the context in fresh errors. If the macro is
    // "EmbedLiveSample", there are cases when the same call signatures
    // yield different results. For example, when the live-sample ID
    // provided as the first argument can't be found or is not provided
    // at all, the result depends on the macro's location in the document.
    const priorResult = signatureToResult.get(token.signature);

    if (
      priorResult &&
      !priorResult.errors.fatal &&
      !priorResult.errors.nonFatal &&
      macroName !== "embedlivesample"
    ) {
      currentResult.output = priorResult.output;
    } else {
      if (!priorResult) {
        signatureToResult.set(token.signature, currentResult);
      }
      // Now start rendering this macro.
      try {
        currentResult.output = await templates.render(
          macroName,
          token.args,
          pageEnvironment
        );
      } catch (e) {
        let macroError;
        if (
          e instanceof ReferenceError &&
          e.message.startsWith("Unknown macro")
        ) {
          // The named macro does not exist
          macroError = new MacroNotFoundError(e, source, token);
        } else if (e instanceof Error && e.name == "SyntaxError") {
          // There was a syntax error compiling the macro
          macroError = new MacroCompilationError(e, source, token);
        } else {
          // There was a runtime error executing the macro
          macroError = new MacroExecutionError(e, source, token);
        }
        currentResult.errors.fatal = macroError;
        // There was a fatal error while rendering this macro, so
        // just use the original macro source text for the output.
        currentResult.output = source.slice(
          token.location.start.offset,
          token.location.end.offset
        );
      }
    }
    output += currentResult.output;
    if (currentResult.errors.fatal) {
      errors.push(currentResult.errors.fatal);
    } else if (currentResult.errors.nonFatal) {
      for (const error of currentResult.errors.nonFatal) {
        errors.push(error);
      }
    }
  }
  return {
    markup: output,
    frontMatter,
    errors,
  };
}
