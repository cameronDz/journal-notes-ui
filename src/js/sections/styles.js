import { basicColorPalette, sophisticatedColorPalette } from "../libs/colors";

const contentStyles = {
  contentRoot: {
    backgroundColor: basicColorPalette?.white?.hex,
    flexGrow: 1,
    minHeight: "100%",
    "& .nssd-grid-wrapper": {
      maxWidth: "1440px",
      margin: "auto",
      "& .MuiBox-root": {
        paddingTop: "6px",
      },
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: sophisticatedColorPalette?.darkBrown?.hex,
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: sophisticatedColorPalette?.lightBrown?.hex,
    },
  },
  contentTop: {
    minHeight: "8px",
  },
  contentLoader: {
    paddingTop: "1px",
  },
};

const landingStyles = {
  simpleLandingText: { fontSize: "14px", fontWeight: 600 },
};

export { contentStyles, landingStyles };
