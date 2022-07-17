import { setRelaunchButton } from "@create-figma-plugin/utilities";
import { getReferenceName } from "./styleUtility";

interface TextScale {
  large: { [key: string]: string };
  xxlarge: { [key: string]: string };
  xxxlarge: { [key: string]: string };
}

const textScale: TextScale = {
  large: {},
  xxlarge: {},
  xxxlarge: {},
};

function loadTextStyle() {
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

  console.log("textScale", textScale);
}

function updateAllTextProperty() {
  let selectedNodes = figma.currentPage.selection;

  selectedNodes.forEach((selectedNode) => {
    (<FrameNode>selectedNode).findAll().forEach((node) => {
      if (node.type === "TEXT") {
        let text = <TextNode>node;
        console.log("style id", text.textStyleId);
      }
    });
  });
  // await Promise.all(
  // console.log("bank");
  // );
}

export default function () {
  setRelaunchButton(figma.currentPage, "Text Scale", {
    description: "Update to Large Scale",
  });

  loadTextStyle();
  updateAllTextProperty();

  console.log("command", figma.command);

  // updateAllTextProperty().then(() => {
  //   figma.closePlugin("Updated 🎉");
  // });

  figma.closePlugin("Updated 🎉");
}

export { updateAllTextProperty };
