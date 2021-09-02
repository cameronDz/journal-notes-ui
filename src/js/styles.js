import { sophisticatedColorPalette } from "./libs/colors";
import { globalDimensions } from "./libs/dimensions";
const navBarSizePx = globalDimensions?.appNavBarSize?.px;

const appContainerStyles = {
  appWrapper: {
    height: "100%",
  },
  appNavBarWrapper: {
    backgroundColor: sophisticatedColorPalette?.coolBlue?.hex,
    display: "block",
    height: "100%",
    position: "fixed",
    width: navBarSizePx,
  },
  appHeaderBarWrapper: {
    backgroundColor: sophisticatedColorPalette?.darkBlue?.hex,
    height: navBarSizePx,
  },
  appContentOuterWrapper: {
    marginLeft: navBarSizePx,
    minHeight: "100%",
    minWidth: "800px",
  },
  appContentInnerWrapper: {
    paddingBottom: "36px",
  },
  appFooter: {
    bottom: 0,
    height: "36px",
    marginTop: "-36px",
  },
};

export { appContainerStyles };
