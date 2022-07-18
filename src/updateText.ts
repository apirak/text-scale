import { setRelaunchButton } from "@create-figma-plugin/utilities";
import { getReferenceName, TextScale, loadTextStyle } from "./styleUtility";

let textScale: TextScale;
let targetScale:string = "large";

function updateAllTextProperty() {
  let selectedNodes = figma.currentPage.selection;

  selectedNodes.forEach((selectedNode) => {
    (<FrameNode>selectedNode).findAll().forEach((node) => {
      if (node.type === "TEXT") {
        let textNode = <TextNode>node;
        // textNode.textStyleId = textScale[targetScale]["body"]
        console.log("style id", textNode.textStyleId);
        console.log("TextScale", textScale);
        console.log("TextScale", textScale["large"]);
      }
    });
  });
  // await Promise.all(
  // console.log("bank");
  // );
}

let startPlugin = () => {
  setRelaunchButton(figma.currentPage, "Text Scale", {
    description: "Update to Large Scale",
  });

  textScale = loadTextStyle();
  updateAllTextProperty();

  console.log("Target Scale", targetScale);

  // updateAllTextProperty().then(() => {
  //   figma.closePlugin("Updated 🎉");
  // });

  figma.closePlugin("Updated 🎉");
}

let toLarge = () => {
  targetScale = "Large";
  startPlugin();
}

let toXXLarge = () => {
  targetScale = "XXLarge"
  startPlugin();
}

export default startPlugin;
export { updateAllTextProperty, toLarge, toXXLarge };
