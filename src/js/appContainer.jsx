import React, { useState, Fragment } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";
import LeftNavBar from "./components/leftNavBar";
import NavTabs from "./components/sections/tabs";
import { appContainerStyles } from "./styles";

const useStyles = makeStyles(() => appContainerStyles);
const AppContainer = () => {
  const [page, setPage] = useState("home");
  const handleNavBarIconClick = (event) => {
    setPage(event || "home");
  };

  const classes = useStyles();
  return (
    <Fragment>
      <div className={classNames(classes?.appWrapper)}>
        <div className={classNames(classes?.appNavBarWrapper)}>
          <LeftNavBar onClick={handleNavBarIconClick} />
        </div>
        <div className={classNames(classes?.appContentWrapper)}>
          <div className={classNames(classes?.appHeaderBarWrapper)}></div>
          <NavTabs page={page} />
        </div>
      </div>
    </Fragment>
  );
};

export default AppContainer;
