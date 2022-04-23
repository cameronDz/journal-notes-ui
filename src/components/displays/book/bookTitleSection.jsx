import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { getDateDisplay } from "../../../libs/date";
import { bookTitleSectionStyles as styles } from "./styles";

const propTypes = {
  author: PropType.string,
  bookDescription: PropType.string,
  bookSource: PropType.string,
  pageCount: PropType.string,
  publishDate: PropType.string,
  publisher: PropType.string,
  title: PropType.string,
};
const useStyles = makeStyles(() => styles);
const BookTitleSection = ({
  author = "",
  bookDescription = "",
  bookSource = "",
  pageCount = "",
  publishDate = "",
  publisher = "",
  title = "",
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      {!!title && (
        <div>
          <span className={classNames(classes.bookHeaderText)}>{title}</span>
          <span>{`. ${author}`}</span>
        </div>
      )}
      {!!bookDescription && (
        <div className={classNames(classes.bookSubHeaderText)}>
          {bookDescription}
        </div>
      )}
      <div className={classNames(classes.bookSubText)}>
        {!!bookSource && <span>{bookSource}</span>}
        {!!bookSource && !!pageCount && <span> </span>}
        {!!pageCount && <span>({pageCount} pgs)</span>}
        {(!!bookSource || !!pageCount) && <span>. </span>}
        {!!publisher && <span>{publisher}</span>}
        {!!publisher && !!publishDate && <span>, </span>}
        {!!publishDate && <span>{getDateDisplay(publishDate)}</span>}
        {(!!publisher || !!publishDate) && <span>.</span>}
      </div>
    </Fragment>
  );
};

BookTitleSection.propTypes = propTypes;
export default BookTitleSection;
