import { globalDimensions } from "../libs/dimensions";
import { sophisticatedColorPalette } from "../libs/colors";

const appFooterStyles = {
  appFooterWrapper: {
    bottom: "0",
    margin: "-36px auto 0 auto",
    maxHeight: "24px",
    maxWidth: "1440px",
    textAlign: "center",
  },
};

const articleOverviewStyles = {
  overviewDescription: { fontSize: "18px", lineHeight: "24px" },
  overviewSimple: { fontSize: "12px" },
  overviewTitle: { fontSize: "24px", lineHeight: "28px" },
};

const navBarStyles = {
  navBarRoot: {
    marginTop: globalDimensions?.appNavBarSize?.px,
  },
};

const navBarIconStyles = {
  iconWrapper: {
    marginBottom: "12px",
    "& .MuiButtonBase-root": {
      width: "100%",
      "&:hover": {
        backgroundColor: sophisticatedColorPalette?.darkBlue?.hex,
      },
    },
    "& svg": {
      margin: "0 auto",
      width: "100%",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
};

const sectionHeaderStyles = {
  titleText: { fontSize: "16px" },
};

export {
  appFooterStyles,
  articleOverviewStyles,
  navBarIconStyles,
  navBarStyles,
  sectionHeaderStyles,
};
