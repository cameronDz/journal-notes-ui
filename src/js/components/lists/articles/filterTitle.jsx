import React from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { fitlerTitleStyles } from "./styles";

const propTypes = { title: PropType.string };
const useStyles = makeStyles(() => fitlerTitleStyles);
const FilterTitle = ({ title }) => {
  const classes = useStyles();
  return (
    !!title && (
      <div className={classNames(classes?.filterTitleHeader)}>{title}</div>
    )
  );
};

FilterTitle.propTypes = propTypes;
export default FilterTitle;
