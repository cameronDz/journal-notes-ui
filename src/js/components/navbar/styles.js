import { globalDimensions } from "../../libs/dimensions";
import { sophisticatedColorPalette } from "../../libs/colors";

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

export { navBarIconStyles, navBarStyles };
