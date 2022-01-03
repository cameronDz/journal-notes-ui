import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListBulletpoints from "../listBulletpoints";
import TagsDisplay from "../tagsDisplay";
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
            <span
              className={classNames(
                classes.bookHeaderText,
                classes.bookSemiBoldText
              )}
            >
              {note.title}
            </span>
            <span>. {note.author}</span>
          </div>
        )}
        {!!note.bookDescription && (
          <div className={classNames(classes.bookHeaderText)}>
            {note.bookDescription}
          </div>
        )}
        <div className={classNames(classes.bookSubText)}>
          {!!note.bookSource && <span>{note.bookSource} </span>}
          {!!note.pageCount && <span>({note.pageCount} pgs)</span>}
          {(!!note.bookSource || !!note.pageCount) && <span>.</span>}
          {!!note.publisher && <span>{note.publisher} </span>}
          {!!note.publishDate && <span>{note.publishDate}</span>}
          {(!!note.publisher || !!note.publishDate) && <span>.</span>}
        </div>
        <div
          className={classNames(
            classes.bookHeaderText,
            classes.bookSessionDescription
          )}
        >
          {note.readDescription}
        </div>
        <div className={classNames(classes.bookSubText)}>
          <span>
            {note.readTime}, <span>({note.readDate})</span>.{" "}
          </span>
          <span>
            pgs: {note.startPage} - {note.endPage}.
          </span>
        </div>
        {showFull && (
          <Fragment>
            {note.comments?.length > 0 && (
              <ListBulletpoints
                keyName="comment"
                points={note.comments}
                title="Comments"
              />
            )}
            {note.quotes?.length > 0 && (
              <ListBulletpoints
                keyName="quote"
                points={note.quotes}
                title="Quotes"
              />
            )}
            <TagsDisplay tags={note.tags} />
          </Fragment>
        )}
      </Fragment>
    )
  );
};

BookView.propTypes = propTypes;
export default BookView;
