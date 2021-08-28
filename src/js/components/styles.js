import { globalDimensions } from "../libs/dimensions";
const appFooterStyles = {
  appFooterWrapper: {
    bottom: "0",
    margin: "-36px auto 0 auto",
    maxHeight: "24px",
    maxWidth: "1440px",
    textAlign: "center",
  },
};

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

export { appFooterStyles, navBarIconStyles, navBarStyles };
