import React, { Fragment } from "react";
import classNames from "classnames";
import { SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { navBarStyles } from "./styles";

const useStyles = makeStyles(() => navBarStyles);
const LeftNavBar = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classNames(classes?.navBarRoot)}>
        <div className={classNames(classes?.iconWrapper)}>
          <SvgIcon fontSize="large">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        </div>
      </div>
    </Fragment>
  );
};

export default LeftNavBar;
