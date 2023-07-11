import { processLine } from "./index.js";

const output = processLine(process.argv[2], { "page-type": process.argv[3] });
console.log(output.markup);
console.log(output.frontMatter);
