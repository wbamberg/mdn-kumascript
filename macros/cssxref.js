export function executeMacro(args, frontMatter) {
	const baseURL = "https://developer.mozilla.org/en-US/docs/Web/CSS/";

	// remove <> for data types
	let slug = args[0].replace(/&lt;(.*)&gt;/g, "$1");
	let displayName = args[1] || args[0];
	let fragment = args[2] || "";

	// Special case <color>, <flex>, and <position>
	switch (args[0]) {
		case "&lt;color&gt;":
			slug = "color_value";
			break;

		case "&lt;flex&gt;":
			slug = "flex_value";
			break;

		case "&lt;position&gt;":
			slug = "position_value";
			break;
	}

	if (!args[1]) {
		// Append parameter brackets to CSS functions
		if (
			frontMatter["page-type"] === "css-function" &&
			!displayName.endsWith("()")
		) {
			displayName += "()";
		}
		// Enclose CSS data types in arrow brackets
		if (
			frontMatter["page-type"] === "css-type" &&
			!/^&lt;.+&gt;$/.test(displayName)
		) {
			displayName = "&lt;" + displayName + "&gt;";
		}
	}
	return `<a href="${baseURL}${slug}${fragment}"><code>${displayName}</code></a>`;
}
