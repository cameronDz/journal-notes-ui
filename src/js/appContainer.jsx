import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core";
import AppFooter from "./components/appFooter";
import LeftNavBar from "./components/leftNavBar";
import NavTabs from "./components/sections/tabs";
import { fetchArticles } from "./components/lists/articles/state/actions";
import { appContainerStyles } from "./styles";

const propTypes = { callFetchArticles: PropType.func };
const useStyles = makeStyles(() => appContainerStyles);
const AppContainer = ({ callFetchArticles }) => {
  useEffect(() => {
    if (typeof callFetchArticles === "function") {
      callFetchArticles();
    }
  }, [callFetchArticles]);

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

AppContainer.propTypes = propTypes;
const mapStateToProps = () => ({});
const mapDispatchToProps = { callFetchArticles: fetchArticles };
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
