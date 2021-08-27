import { sophisticatedColorPalette } from "./libs/colors";
import { globalDimensions } from "./libs/dimensions";
const navBarSizePx = globalDimensions?.appNavBarSize?.px;

const appContainerStyles = {
  appWrapper: {
    height: "100%",
  },
  appNavBarWrapper: {
    backgroundColor: sophisticatedColorPalette?.coolBlue,
    display: "block",
    height: "100%",
    position: "fixed",
    width: navBarSizePx,
  },
  appHeaderBarWrapper: {
    backgroundColor: sophisticatedColorPalette?.darkBlue,
    height: navBarSizePx,
  },
  appContentWrapper: {
    display: "-block",
    marginLeft: navBarSizePx,
    minWidth: "800px",
    paddingBottom: "36px",
  },
  appFooterWrapper: {
    bottom: "0",
    margin: "-36px auto 0 auto",
    maxHeight: "24px",
    maxWidth: "1440px",
    textAlign: "center",
  },
};

export { appContainerStyles };
