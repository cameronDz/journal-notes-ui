import React, { Fragment } from "react";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core";

const includeComma = (index, length) => {
  return length > 1 && index !== length - 1 ? `, ` : "";
};

const styles = {
  textBold: {
    fontWeight: 600,
  },
  textItalic: {
    textDecoration: "italic",
  },
};
const propTypes = { tags: PropType.arrayOf(PropType.string) };
const useStyles = makeStyles(() => styles);
const TagsDisplay = ({ tags = [] }) => {
  const length = Array.isArray(tags) ? tags.length : -1;
  const classes = useStyles();
  return (
    <p>
      <span className={classes.textBold}>Tags</span>
      <span>{`: `}</span>
      <span className={classes.textItalic}>
        {length > 0
          ? tags.map((key, index) => {
              return (
                !!key && (
                  <Fragment key={index}>
                    {key}
                    {includeComma(index, length)}
                  </Fragment>
                )
              );
            })
          : `No associated tags.`}
      </span>
    </p>
  );
};

TagsDisplay.propTypes = propTypes;
export default TagsDisplay;
