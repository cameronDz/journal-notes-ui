import { basicColorPalette } from "../../libs/colors";

const contentStyles = {
  contentRoot: {
    backgroundColor: basicColorPalette?.white?.hex,
    flexGrow: 1,
    "& .nssd-grid-wrapper": { maxWidth: "1440px", margin: "auto" },
  },
  contentTop: {
    minHeight: "8px",
  },
  contentLoader: {
    paddingTop: "1px",
  },
};

const landingStyles = {
  headerLandingText: { alignItems: "center", justifyContent: "center" },
  simpleLandingText: { fontSize: "14px", fontWeight: 600 },
};

export { contentStyles, landingStyles };
