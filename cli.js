import { processMacros } from "./index.js";

const output = processMacros(process.argv[2], { "page-type": process.argv[3] });
console.log(output.markup);
console.log(output.frontMatter);
