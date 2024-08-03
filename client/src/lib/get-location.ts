export function getLocation() {
  const location = window.location.href;

  return `http://${location.split('/')[2]}`;
}