export function removeSeparator(str: string) {
  const separator = str.split(":").map((item) => item.trim());
  // return separator.slice(-1);
  return separator;
}
