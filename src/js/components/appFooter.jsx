import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";
import { appFooterStyles } from "./styles";
import * as _packageDetails from "../../../package.json";

const useStyles = makeStyles(() => appFooterStyles);
const AppFooter = () => {
  const name = _packageDetails?.author?.name || "";
  const classes = useStyles();
  return (
    <div className={classNames(classes?.appFooterWrapper)}>
      {name} &copy; 2021 {displayVersion}
    </div>
  );
};

export default AppFooter;
