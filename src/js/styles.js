import { sophisticatedColorPalette } from "./libs/colors";
import { globalDimensions } from "./libs/dimensions";
const navBarSizePx = globalDimensions?.appNavBarSize?.px;

const appContainerStyles = {
  appOutWrapper: {
    height: "100%",
  },
  appInnerWrapper: {
    paddingBottom: "36px",
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
    marginLeft: navBarSizePx,
    minHeight: "100%",
    minWidth: "800px",
    paddingBottom: "36px",
  },
  appFooter: {
    height: "36px",
    marginTop: "-36px",
  },
};

export { appContainerStyles };
