import { setRelaunchButton } from "@create-figma-plugin/utilities";
import {
  getReferenceName,
  TextScale,
  loadTextStyle,
  Scale,
} from "./styleUtility";

let textScale: TextScale;
let targetScale: Scale = "large";
let countUpdated: number = 0;
let countTextNode: number = 0;

function updateTextProperty(node: TextNode) {
  let textNodeStyleId = node.textStyleId;
  if (textNodeStyleId != null) {
    let textStyle = figma.getStyleById(<string>textNodeStyleId);
    if (textStyle != null) {
      let [directory, textStyleName] = getReferenceName(textStyle.name);
      if (textScale[targetScale][textStyleName] != undefined) {
        node.textStyleId = textScale[targetScale][textStyleName];
        countUpdated++;
      }
    }
  }
  countTextNode++;
}

function updateOnlyTextNode(node: SceneNode) {
  if (node.type === "TEXT") {
    updateTextProperty(<TextNode>node);
  }
}

function updateAllTextProperty() {
  let selectedNodes = figma.currentPage.selection;
  if (selectedNodes.length == 0) {
    figma.closePlugin("Empty target, Please selected some layer");
  }
  selectedNodes.forEach((selectedNode) => {
    updateOnlyTextNode(selectedNode);
    if (selectedNode.type === "FRAME") {
      (<FrameNode>selectedNode).findAll().forEach((node) => {
        updateOnlyTextNode(node);
      });
    }
  });
}

let startPlugin = () => {
  // setRelaunchButton(figma.currentPage, "Text Scale", {
  //   description: "Update to Large Scale",
  // });

  textScale = loadTextStyle();

  if (Object.keys(textScale[targetScale]).length === 0) {
    figma.closePlugin(`Empty style for "${targetScale}"`);
  }

  updateAllTextProperty();

  figma.closePlugin(`Updated (${countUpdated}/${countTextNode})  🎉`);
};

let toLarge = () => {
  targetScale = "large";
  startPlugin();
};

let toXLarge = () => {
  targetScale = "xlarge";
  startPlugin();
};

let toXXLarge = () => {
  targetScale = "xxlarge";
  startPlugin();
};

let toXXXLarge = () => {
  targetScale = "xxxlarge";
  startPlugin();
};

let toAX1 = () => {
  targetScale = "ax1";
  startPlugin();
};

let toAX2 = () => {
  targetScale = "ax2";
  startPlugin();
};

export default startPlugin;
export {
  updateAllTextProperty,
  toLarge,
  toXLarge,
  toXXLarge,
  toXXXLarge,
  toAX1,
  toAX2,
};
