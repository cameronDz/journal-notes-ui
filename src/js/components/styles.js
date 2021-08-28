import { globalDimensions } from "../libs/dimensions";

const navBarStyles = {
  navBarRoot: {
    marginTop: globalDimensions?.appNavBarSize?.px,
  },
};

const navBarIconStyles = {
  iconWrapper: {
    marginBottom: "12px",
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
