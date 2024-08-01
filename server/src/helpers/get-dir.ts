export function getDirname() {
  const __dirname = import.meta.dirname;
  const dirArray = __dirname.split('\\');

  dirArray.pop();
  dirArray.pop();

  return dirArray.join('\\');
}
