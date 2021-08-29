import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { articleOverviewStyles } from "./styles";

const propTypes = {
  author: PropType.string,
  createdDate: PropType.string,
  description: PropType.string,
  publishDate: PropType.string,
  publisher: PropType.string,
  title: PropType.string,
  url: PropType.string,
};
const textResources = "Resource added";
const useStyles = makeStyles(() => articleOverviewStyles);
const ArticleOverview = ({
  author,
  createdDate,
  description,
  publishDate,
  publisher,
  title,
  url,
}) => {
  const classes = useStyles();
  const display = publisher || url || "";
  const link = display && url ? <a href={url}>{display}</a> : display;
  const sourceDisplay = link && (
    <Fragment>
      <i>Source</i>
      {`: `}
      {link}
      {`.`}
    </Fragment>
  );

  const publishDateDisplay = publishDate || "";
  const comma = !!author && (!!sourceDisplay || !!publishDateDisplay) && ",";
  const authorDisplay = !!author && (
    <Fragment>
      {author}
      {comma}
    </Fragment>
  );
  return (
    <Fragment>
      <div className={classNames(classes?.overviewTitle)}>{title}</div>
      <div className={classNames(classes?.overviewSimple)}>
        {authorDisplay} {sourceDisplay} {publishDateDisplay}
      </div>
      <div className={classNames(classes?.overviewSimple)}>
        <strong>{textResources}</strong>
        {`: `}
        <i>{createdDate}</i>
      </div>
      <div className={classNames(classes?.overviewDescription)}>
        {description}
      </div>
    </Fragment>
  );
};

ArticleOverview.propTypes = propTypes;
export default ArticleOverview;
