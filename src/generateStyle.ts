import { TextScale, scaleName, Scale, loadTextStyle, getReferenceName } from "./styleUtility";

let duplicateTextStyleFollowScale = async (original:TextStyle, plusFontSize:number, scale:Scale) => {
  let style = figma.createTextStyle();

  let [originalScale, name] = getReferenceName(original.name);
  style.name = `${scaleName[scale]}/${name}`;

  await figma.loadFontAsync(original["fontName"]).then(() => {
    console.log("after load font");
    style["fontName"] = original["fontName"];
    console.log("1");
    style["textDecoration" ] = original["textDecoration" ];
    console.log("2");
    style["letterSpacing"] = original["letterSpacing"];
    console.log("3");
    style["lineHeight"] = original["lineHeight"];
    console.log("4");
    style["paragraphIndent"] = original["paragraphIndent"];
    console.log("5");
    style["paragraphSpacing" ] = original["paragraphSpacing" ];
    console.log("6");
    style["textCase"] = original["textCase"];
    console.log("7");
    style["description" ] = original["description" ];
    console.log("8");
    // style["documentationLinks"] = original["documentationLinks"];

    console.log("9");

    console.log("fontSize", original["fontSize"])
    console.log("fontSize plus", original["fontSize"] + plusFontSize);
    style["fontSize"] = original["fontSize"] + plusFontSize;
  }).catch(function () {
    console.log("Promise Rejected");
  });
}

let generateTextStyle = async (scale:Scale) => {
  let localStyle = loadTextStyle();

  await Promise.all(
    Object.entries(localStyle.large).map((style, index) => {
      console.log("A");
      let originalStyle = <TextStyle>figma.getStyleById(style[1]);
      if (originalStyle != null) {
        console.log("B");
        return duplicateTextStyleFollowScale(originalStyle, 2, scale);
      }
    })
  );
}

let generateXXLarge = () => {
  generateTextStyle("xxlarge").then(() => {
    figma.closePlugin(`Created 🎉`);
  });
};

export { generateXXLarge };
