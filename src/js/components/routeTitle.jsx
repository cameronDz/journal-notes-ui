import React from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { routeTitleStyles } from "../sections/styles";

const propTypes = { title: PropType.string };
const useStyles = makeStyles(() => routeTitleStyles);
const RouteTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes?.panelHeader)}>
      <h2>{title}</h2>
    </div>
  );
};

RouteTitle.propTypes = propTypes;
export default RouteTitle;
