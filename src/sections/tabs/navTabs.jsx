import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { connect } from "react-redux";
import { Switch as RouterSwitch, Route } from "react-router-dom";
import { Grid, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EditorSection } from "../editor";
import { LandingSection } from "../landing";
import { ArticleSection } from "../notes";
import Panel from "./panel";
import { contentStyles } from "./styles";

const pages = [
  {
    name: "home",
    title: "Notes Overview",
    index: 0,
  },
  {
    name: "view",
    title: "Notes List",
    index: 1,
  },
  {
    name: "search",
    title: "Notes Card with Filters",
    index: 2,
  },
  {
    name: "create",
    title: "Note Review Creator",
    index: 3,
  },
  {
    name: "edit",
    title: "Note Review Editor",
    index: 4,
  },
];

const propTypes = {
  isInputIndexLoading: PropType.bool,
  isNoteIndexLoading: PropType.bool,
  isNotesLoading: PropType.bool,
  isProcessingNote: PropType.bool,
  isProcessingIndex: PropType.bool,
};
const useStyles = makeStyles(() => contentStyles);
const NavTabs = ({
  isInputIndexLoading,
  isNoteIndexLoading,
  isNotesLoading,
  isProcessingIndex,
  isProcessingNote,
}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isNotes = isNoteIndexLoading || isNotesLoading;
    const isProc = isProcessingIndex || isProcessingNote;
    setIsLoading(isInputIndexLoading || isNotes || isProc);
  }, [
    isInputIndexLoading,
    isNoteIndexLoading,
    isNotesLoading,
    isProcessingIndex,
    isProcessingNote,
  ]);

  return (
    <div className={classNames(classes.contentRoot)}>
      <div className={classNames(classes.contentTop)}>
        {isLoading && (
          <LinearProgress className={classNames(classes.contentLoader)} />
        )}
      </div>
      <Grid className="nssd-grid-wrapper" container spacing={0}>
        <Grid item xs={12} sm={12}>
          <Panel>
            <RouterSwitch>
              <Route exact path="/">
                <LandingSection title={pages[0].title} />
              </Route>
              <Route exact path={`/${pages[0].name}`}>
                <LandingSection title={pages[0].title} />
              </Route>
              <Route exact path={`/${pages[1].name}`}>
                <ArticleSection
                  pageName={pages[1].name}
                  title={pages[1].title}
                />
              </Route>
              <Route exact path={`/${pages[2].name}`}>
                <ArticleSection
                  pageName={pages[2].name}
                  title={pages[2].title}
                />
              </Route>
              <Route exact path={`/${pages[3].name}`}>
                <EditorSection isNew={true} pageTitle={pages[3].title} />
              </Route>
              <Route exact path={`/${pages[4].name}`}>
                <EditorSection isNew={false} pageTitle={pages[4].title} />
              </Route>
            </RouterSwitch>
          </Panel>
        </Grid>
      </Grid>
    </div>
  );
};

NavTabs.propTypes = propTypes;
const mapStateToProps = (state) => ({
  isInputIndexLoading: state.editor.isLoadingIndex,
  isNoteIndexLoading: state.notes.isLoadingIndex,
  isNotesLoading: state.notes.isNotesLoading,
  isProcessingIndex: state.editor.isProcessingIndex,
  isProcessingNote: state.editor.isProcessingNote,
});
export default connect(mapStateToProps)(NavTabs);
