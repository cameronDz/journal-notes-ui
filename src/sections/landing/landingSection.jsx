import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { ArticleCard } from "../../components/displays/article";
import { BookCard } from "../../components/displays/book";
import RouteTitle from "../../components/routeTitle";
import { latestArticle } from "../../libs/latestArticle";
import { landingText } from "../../libs/text";
import { journalTypes } from "../../libs/types";
import { landingStyles as styles } from "./styles";

const propTypes = {
  isLoadingIndex: PropType.bool,
  isLoadingNotes: PropType.bool,
  notes: PropType.array,
  title: PropType.string,
};
const useStyles = makeStyles(() => styles);
const LandingSection = ({ isLoadingIndex, isLoadingNotes, notes, title }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isLoadingIndex || isLoadingNotes);
  }, [isLoadingIndex, isLoadingNotes]);

  const text = isLoading ? landingText.loading : landingText.noArticles;
  const note = latestArticle(notes) || {};
  return (
    <Fragment>
      <RouteTitle title={title} />
      <div>{landingText.overview}</div>
      <div>
        {(isLoading || !notes) && (
          <span className={classNames(classes.simpleLandingText)}>{text}</span>
        )}
        {!isLoading && !!notes && (
          <Fragment>
            {note.journalType === journalTypes.BOOK && (
              <BookCard noteData={note} />
            )}
            {note.journalType !== journalTypes.BOOK && (
              <ArticleCard articleData={note} />
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

LandingSection.propTypes = propTypes;
const mapStateToProps = (state) => ({
  isLoadingIndex: state.notes.isLoadingIndex,
  isLoadingNotes: state.notes.isLoadingNotes,
  notes: state.notes.notes,
});
export default connect(mapStateToProps, {})(LandingSection);
