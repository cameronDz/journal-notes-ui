import React from "react";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core";

const styles = {
  headerContainer: {
    marginTop: "12px",
  },
  textTitle: {
    fontSize: "16px",
    fontWeight: 700,
  },
};
const propTypes = { title: PropType.string };
const useStyles = makeStyles(() => styles);
const SectionHeader = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.headerContainer}>
      {!!title && <span className={classes.textTitle}>{title}</span>}
    </div>
  );
};

SectionHeader.propTypes = propTypes;
export default SectionHeader;
