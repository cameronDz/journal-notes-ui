import { globalDimensions } from "../libs/dimensions";

const navBarStyles = {
  navBarRoot: {
    marginTop: globalDimensions?.appNavBarSize?.px,
  },
  iconWrapper: {
    "& svg": {
      margin: "0 auto",
      width: "100%",
    },
  },
};

export { navBarStyles };
