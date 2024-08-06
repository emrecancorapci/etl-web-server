export function getDirname() {
  const dirArray = __dirname.split('\\');

  dirArray.pop();
  dirArray.pop();

  return dirArray.join('\\');
}
