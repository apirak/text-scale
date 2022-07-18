interface TextScale {
  large: { [key: string]: string };
  xxlarge: { [key: string]: string };
  xxxlarge: { [key: string]: string };
}

function loadTextStyle(): TextScale {
  let textScale: TextScale = {
    large: {},
    xxlarge: {},
    xxxlarge: {},
  };

  figma.getLocalTextStyles().forEach((textStyle) => {
    let { name, id } = textStyle;
    let [folder, refName] = getReferenceName(name);
    if (folder === "Large") {
      textScale.large[refName] = id;
    }
    if (folder === "XXLarge") {
      textScale.xxlarge[refName] = id;
    }
  });

  return textScale;
}

function getReferenceName(name: string): [string, string] {
  let directory = name.split("/").map((str) => str.trim());

  return [directory[0], directory.slice(1).join("/")];
}

export { getReferenceName, loadTextStyle };
export type { TextScale };

