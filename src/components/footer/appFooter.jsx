import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";
import { appFooterStyles } from "./styles";
import _packageDetails from "../../../package.json";

const useStyles = makeStyles(() => appFooterStyles);
const AppFooter = () => {
  const name = _packageDetails?.author?.name || "";
  const version = _packageDetails?.version || "";
  const versionDisplay = version ? "v" + version : "";
  const classes = useStyles();
  return (
    <div className={classNames(classes.appFooterWrapper)}>
      {name} &copy; 2021 {versionDisplay}
    </div>
  );
};

export default AppFooter;
