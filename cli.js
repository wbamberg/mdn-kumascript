import { processLine } from "./index.js";

const output = processLine(process.argv[2], {});
console.log(output.markup);
