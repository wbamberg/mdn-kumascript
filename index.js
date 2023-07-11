import { Macro } from "./macros.js";

const macroRegex = RegExp("{{.*?}}", "g");

export function processLine(input, frontMatter) {
	let lower = input.toLowerCase();
	let match;
	const output = {
		markup: input,
		frontMatter,
	};
	while ((match = macroRegex.exec(lower)) !== null) {
		const macro = new Macro(match, frontMatter);
		macro.process(output);
		lower = output.markup.toLowerCase();
	}
	return output;
}
