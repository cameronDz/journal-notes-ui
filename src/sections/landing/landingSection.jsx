import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
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
  isUserSecured: PropType.bool,
  notes: PropType.array,
  title: PropType.string,
};
const useStyles = makeStyles(() => styles);
const LandingSection = ({
  isLoadingIndex = false,
  isLoadingNotes = false,
  isUserSecured = false,
  notes = [],
  title = "",
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(isLoadingIndex || isLoadingNotes);
  }, [isLoadingIndex, isLoadingNotes]);

  const handleClickBtn = (data = {}, type = "") => {
    const id = data?.id || "";
    if (!!id && ["clone", "edit"].indexOf(type) > -1) {
      const search = `id=${id}`;
      const pathname = `/${type}`;
      history.push({ pathname, search });
    }
  };

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
              <BookCard
                isClonable={isUserSecured}
                isEditable={isUserSecured}
                noteData={note}
                onClickClone={() => handleClickBtn(note, "clone")}
                onClickEdit={() => handleClickBtn(note, "edit")}
              />
            )}
            {note.journalType !== journalTypes.BOOK && (
              <ArticleCard
                articleData={note}
                isEditable={isUserSecured}
                onClickEdit={() => handleClickBtn(note, "edit")}
              />
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
  isUserSecured: !!state.auth.token,
  notes: state.notes.notes,
});
export default connect(mapStateToProps, {})(LandingSection);
