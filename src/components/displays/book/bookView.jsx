import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { getDateDisplay } from "../../../libs/date";
import BookLists from "./bookLists";
import { bookViewStyles as styles } from "./styles";
import { propTypesBookV1 } from "./types";

const propTypes = {
  note: PropType.shape(propTypesBookV1),
  showFull: PropType.bool,
};

const useStyles = makeStyles(() => styles);
const BookView = ({ note = null, showFull = false }) => {
  const classes = useStyles();
  return (
    !!note && (
      <Fragment>
        {!!note.title && (
          <div>
            <span className={classNames(classes.bookHeaderText)}>
              {note.title}
            </span>
            <span>. {note.author}</span>
          </div>
        )}
        {!!note.bookDescription && (
          <div className={classNames(classes.bookSubHeaderText)}>
            {note.bookDescription}
          </div>
        )}
        <div className={classNames(classes.bookSubText)}>
          {!!note.bookSource && <span>{note.bookSource}</span>}
          {!!note.bookSource && !!note.pageCount && <span> </span>}
          {!!note.pageCount && <span>({note.pageCount} pgs)</span>}
          {(!!note.bookSource || !!note.pageCount) && <span>. </span>}
          {!!note.publisher && <span>{note.publisher}</span>}
          {!!note.publisher && !!note.publishDate && <span>, </span>}
          {!!note.publishDate && (
            <span>{getDateDisplay(note.publishDate)}</span>
          )}
          {(!!note.publisher || !!note.publishDate) && <span>.</span>}
        </div>
        <div
          className={classNames(
            classes.bookSubHeaderText,
            classes.bookSessionDescription
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
