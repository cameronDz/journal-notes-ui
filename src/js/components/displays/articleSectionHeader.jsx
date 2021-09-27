import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { sectionHeaderStyles } from "./styles";

const propTypes = { title: PropType.string };
const useStyles = makeStyles(() => sectionHeaderStyles);
const ArticleSectionHeader = ({ title }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <br />
      {!!title && (
        <div>
          <strong className={classNames(classes?.titleText)}>{title}</strong>
        </div>
      )}
    </Fragment>
  );
};

ArticleSectionHeader.propTypes = propTypes;
export default ArticleSectionHeader;
