import { render } from "./dist/render.js";

const input = process.argv[2];
const environment = { frontMatter: {} };

const output = await render(input, environment);
console.log(output);
console.log(environment.frontMatter);
