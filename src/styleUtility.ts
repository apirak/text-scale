interface TextScale {
  large: { [key: string]: string };
  xlarge: { [key: string]: string };
  xxlarge: { [key: string]: string };
  xxxlarge: { [key: string]: string };
  ax1: { [key: string]: string };
  ax2: { [key: string]: string };
}

type Scale = "large" | "xlarge" | "xxlarge" | "xxxlarge" | "ax1" | "ax2";
let Scale = ["large", "xlarge", "xxlarge", "xxxlarge", "ax1", "ax2"];

function loadTextStyle(): TextScale {
  let textScale: TextScale = {
    large: {},
    xlarge: {},
    xxlarge: {},
    xxxlarge: {},
    ax1: {},
    ax2: {},
  };

  figma.getLocalTextStyles().forEach((textStyle) => {
    let { name, id } = textStyle;
    let [folder, refName] = getReferenceName(name);
    if (Scale.includes(folder)) {
      textScale[folder][refName] = id;
    }
  });

  return textScale;
}

function getReferenceName(name: string): [Scale, string] {
  let directory = name.split("/").map((str) => str.trim());
  return [
    <Scale>directory[0].toLowerCase(),
    directory.slice(1).join("/").toLowerCase(),
  ];
}

export { getReferenceName, loadTextStyle };
export type { TextScale, Scale };
