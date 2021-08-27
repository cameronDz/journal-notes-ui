import { sophisticatedColorPalette } from "./libs/colors";

const appContainerStyles = {
  appWrapper: {
    height: "100%",
  },
  appNavBarWrapper: {
    backgroundColor: sophisticatedColorPalette?.coolBlue,
    display: "block",
    height: "100%",
    position: "fixed",
    width: "84px",
  },
  appHeaderBarWrapper: {
    backgroundColor: sophisticatedColorPalette?.darkBlue,
    height: "84px",
  },
  appContentWrapper: {
    display: "-block",
    marginLeft: "84px",
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
