function getReferenceName(name: string): [string, string] {
  let directory = name.split("/").map((str) => str.trim());
  return [directory[0], directory.slice(1).join("/")];
}

export { getReferenceName };
