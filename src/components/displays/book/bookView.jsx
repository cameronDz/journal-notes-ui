import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { getDateDisplay } from "../../../libs/date";
import BookLists from "./bookLists";
import BookTitleSection from "./bookTitleSection";
import { bookViewStyles as styles } from "./styles";
import { propTypesBookV1 } from "./types";

const propTypes = {
  isChild: PropType.bool,
  note: PropType.shape(propTypesBookV1),
  showFull: PropType.bool,
};

const useStyles = makeStyles(() => styles);
const BookView = ({ isChild = false, note = null, showFull = false }) => {
  const classes = useStyles();
  return (
    !!note && (
      <Fragment>
        {!isChild && (
          <BookTitleSection
            author={note.author}
            bookDescription={note.bookDescription}
            bookSource={note.bookSource}
            pageCount={note.pageCount}
            publishDate={note.publishDate}
            publisher={note.publisher}
            title={note.title}
          />
        )}
        <div
          className={classNames(
            classes.bookSubHeaderText,
            !isChild && classes.bookSessionDescription
          )}
        >
          {note.readDescription}
        </div>
        <div className={classNames(classes.bookSubText)}>
          <span>
            {!!note.readTime && <span>{note.readTime}</span>}
            {!!note.readTime && !!note.readDate && <span>, </span>}
            {!!note.readDate && <span>({getDateDisplay(note.readDate)})</span>}
            {(!!note.readTime || !!note.readDate) && <span>. </span>}
          </span>
          {!!note.startPage && !!note.endPage && (
            <span>
              <i>pages</i> {note.startPage} - {note.endPage}.
            </span>
          )}
        </div>
        {showFull && (
          <BookLists
            comments={note.comments}
            definitions={note.definitions}
            quotes={note.quotes}
            resources={note.resources}
            tags={note.tags}
          />
        )}
      </Fragment>
    )
  );
};

BookView.propTypes = propTypes;
export default BookView;
