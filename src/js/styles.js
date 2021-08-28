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
  appContentWrapper: {
    display: "-block",
    marginLeft: navBarSizePx,
    minWidth: "800px",
    paddingBottom: "36px",
  },
};

export { appContainerStyles };
