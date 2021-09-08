import React, { Fragment } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";
import AppFooter from "./components/appFooter";
import LeftNavBar from "./components/leftNavBar";
import NavTabs from "./components/sections/tabs";
import { appContainerStyles } from "./styles";

const useStyles = makeStyles(() => appContainerStyles);
const AppContainer = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classNames(classes?.appWrapper)}>
        <div className={classNames(classes?.appNavBarWrapper)}>
          <LeftNavBar />
        </div>
        <div className={classNames(classes?.appContentOuterWrapper)}>
          <div className={classNames(classes?.appContentInnerWrapper)}>
            <div className={classNames(classes?.appHeaderBarWrapper)}></div>
            <NavTabs />
          </div>
        </div>
        <div className={classNames(classes?.appFooter)}>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};

export default AppContainer;
