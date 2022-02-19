import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core";
import { fetchArticles } from "../state/notes/actions";
import { AppFooter } from "../components/footer";
import { LeftNavBar } from "../components/navbar";
import { NavTabs } from "./tabs";
import { handleFunction } from "../libs/eventUtil";
import { RequestTokenDialog } from "../auth";
import { appContainerStyles } from "./styles";

let abortCtrlFetchAll = null;
const propTypes = { getAllNotes: PropType.func };
const useStyles = makeStyles(() => appContainerStyles);
const AppContainer = ({ getAllNotes }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    abortCtrlFetchAll?.abort();
    abortCtrlFetchAll = new AbortController();
    const config = { signal: abortCtrlFetchAll.signal };
    handleFunction(getAllNotes, config);
  }, [getAllNotes]);

  const handleIconClick = (name) => {
    if (name !== "signin") {
      history.push(`/${name}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Fragment>
      <div className={classNames(classes.appWrapper)}>
        <div className={classNames(classes.appNavBarWrapper)}>
          <LeftNavBar onClick={handleIconClick} />
        </div>
        <div className={classNames(classes.appContentOuterWrapper)}>
          <div className={classNames(classes.appContentInnerWrapper)}>
            <div className={classNames(classes.appHeaderBarWrapper)}></div>
            <NavTabs />
          </div>
        </div>
        <div className={classNames(classes.appFooter)}>
          <AppFooter />
        </div>
      </div>
      <RequestTokenDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
};

AppContainer.propTypes = propTypes;
const mapStateToProps = () => ({});
const mapDispatchToProps = { getAllNotes: fetchArticles };
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
