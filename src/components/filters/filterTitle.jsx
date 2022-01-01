import React from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { filterTitleStyles } from "./styles";

const propTypes = { title: PropType.string };
const useStyles = makeStyles(() => filterTitleStyles);
const FilterTitle = ({ title }) => {
  const classes = useStyles();
  return (
    !!title && (
      <div className={classNames(classes.filterTitleHeader)}>{title}</div>
    )
  );
};

FilterTitle.propTypes = propTypes;
export default FilterTitle;
