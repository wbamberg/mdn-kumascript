export function executeMacro(args, frontMatter) {
  const url = `https://interactive-examples.mdn.mozilla.net/${args[0]}`;
  frontMatter["interactive-example"] = url;
  return "";
}
