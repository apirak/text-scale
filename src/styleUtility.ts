interface TextScale {
  large: { [key: string]: string };
  xxlarge: { [key: string]: string };
  xxxlarge: { [key: string]: string };
};

type Scale = "large" | "xxlarge" | "xxxlarge";

function loadTextStyle(): TextScale {
  let textScale: TextScale = {
    large: {},
    xxlarge: {},
    xxxlarge: {},
  };

  figma.getLocalTextStyles().forEach((textStyle) => {
    let { name, id } = textStyle;
    let [folder, refName] = getReferenceName(name);
    if (folder === "large") {
      textScale.large[refName] = id;
    }
    if (folder === "xxlarge") {
      textScale.xxlarge[refName] = id;
    }
    if (folder === "xxxlarge") {
      textScale.xxlarge[refName] = id;
    }
  });

  return textScale;
}

function getReferenceName(name: string): [string, string] {
  let directory = name.split("/").map((str) => str.trim());
  return [directory[0].toLowerCase(), directory.slice(1).join("/").toLowerCase()];
}

export { getReferenceName, loadTextStyle };
export type { TextScale, Scale };
