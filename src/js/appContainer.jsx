import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core";

import RequestTokenDialog from "./auth/components/requestTokenDialog";
import { AppFooter } from "./components/footer";
import { LeftNavBar } from "./components/navbar";
import { NavTabs } from "./sections/tabs";
import { fetchArticles } from "./sections/articles/state/actions";
import { appContainerStyles } from "./styles";

const propTypes = { callFetchArticles: PropType.func };
const useStyles = makeStyles(() => appContainerStyles);
const AppContainer = ({ callFetchArticles }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof callFetchArticles === "function") {
      callFetchArticles();
    }
  }, [callFetchArticles]);

  const handleIconClick = (name) => {
    if (name !== "signin") {
      history.push(`/${name}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Fragment>
      <div className={classNames(classes?.appWrapper)}>
        <div className={classNames(classes?.appNavBarWrapper)}>
          <LeftNavBar onClick={handleIconClick} />
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
      <RequestTokenDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
};

AppContainer.propTypes = propTypes;
const mapStateToProps = () => ({});
const mapDispatchToProps = { callFetchArticles: fetchArticles };
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
