export function renderMacro(args, env) {
  const url = `https://interactive-examples.mdn.mozilla.net/${args[0]}`;
  env.frontMatter["interactive-example"] = url;
  return "";
}
