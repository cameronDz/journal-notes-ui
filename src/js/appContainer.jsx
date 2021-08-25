import React, { useEffect, useState, Fragment } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";
import LeftNavBar from "./components/leftNavBar";
import NavTabs from "./components/sections/tabs";
import { appContainerStyles } from "./styles";
import * as _packageDetails from "../../package.json";

const useStyles = makeStyles(() => appContainerStyles);
const AppContainer = () => {
  const [displayVersion, setDisplayVersion] = useState("");

  useEffect(() => {
    const version = _packageDetails?.version;
    const display = version ? "v" + version : "";
    setDisplayVersion(display);
  }, []);

  const classes = useStyles();
  return (
    <Fragment>
      <div className={classNames(classes?.appWrapper)}>
        <div className={classNames(classes?.appNavBarWarpper)}>
          <LeftNavBar />
        </div>
        <div className={classNames(classes?.appContentWrapper)}>
          <NavTabs />
        </div>
      </div>
      <div className={classNames(classes?.appFooterWrapper)}>
        {_packageDetails?.author?.name || ""} &copy; 2021 {displayVersion}
      </div>
    </Fragment>
  );
};

export default AppContainer;
