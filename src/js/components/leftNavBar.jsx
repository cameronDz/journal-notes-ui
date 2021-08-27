import React, { Fragment } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { navBarStyles } from "./styles";

const useStyles = makeStyles(() => navBarStyles);
const LeftNavBar = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classNames(classes?.navBarRoot)}></div>;
    </Fragment>
  );
};

export default LeftNavBar;
