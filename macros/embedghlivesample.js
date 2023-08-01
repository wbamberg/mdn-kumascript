/* 
  Parameters:
  0 - The URL of mdn.github.io page (relative)
  1 - The width of the iframe (optional)
  2 - The height of the iframe (optional)
 */

export function renderMacro(args, env) {
  const url = "https://mdn.github.io/" + args[0];

  const width = args[1] ? `width="${args[1]}" ` : "";
  const height = args[2] ? `height="${args[2]}" ` : "";
  const dimensions = `${width}${height}`;

  return `<iframe ${dimensions}src="${url}"></iframe>`;
}

/*

{{embedghlivesample("my-example")}}
<iframe src="https://mdn.github.io/my-example"></iframe>

{{embedghlivesample("my-example", 100)}}
<iframe width="100" src="https://mdn.github.io/my-example"></iframe>

{{embedghlivesample("my-example", 100, 200)}}
<iframe width="100" height="200" src="https://mdn.github.io/my-example"></iframe>
*/
