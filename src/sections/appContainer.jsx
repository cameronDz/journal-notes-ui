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
const propTypes = {
  getAllNotes: PropType.func,
  isLoadingNoteIndex: PropType.bool,
  isLoadingNoteNotes: PropType.bool,
};
const useStyles = makeStyles(() => appContainerStyles);
const AppContainer = ({
  getAllNotes = null,
  isLoadingNoteIndex = false,
  isLoadingNoteNotes = false,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    abortCtrlFetchAll?.abort();
    abortCtrlFetchAll = new AbortController();
    const config = { limit: true, signal: abortCtrlFetchAll.signal };
    handleFunction(getAllNotes, config);
  }, [getAllNotes]);

  useEffect(() => {
    setIsLoading(isLoadingNoteIndex || isLoadingNoteNotes);
  }, [isLoadingNoteIndex, isLoadingNoteNotes]);

  const handleLoadAll = () => {
    abortCtrlFetchAll?.abort();
    abortCtrlFetchAll = new AbortController();
    const config = { signal: abortCtrlFetchAll.signal };
    handleFunction(getAllNotes, config);
  };

  const handleIconClick = (name) => {
    const path = `/${name}`;
    if (name === "load-all") {
      handleLoadAll();
    } else if (name !== "sign-in") {
      if (history.location.pathname !== path) {
        history.push(path);
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Fragment>
      <div className={classNames(classes.appWrapper)}>
        <div className={classNames(classes.appNavBarWrapper)}>
          <LeftNavBar onClick={handleIconClick} isLoading={isLoading} />
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
const mapStateToProps = (state) => ({
  isLoadingNoteIndex: state.notes.isLoadingIndex,
  isLoadingNoteNotes: state.notes.isLoadingNotes,
});
const mapDispatchToProps = { getAllNotes: fetchArticles };
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
