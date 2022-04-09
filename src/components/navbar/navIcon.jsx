import React from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { IconButton, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { handleFunction } from "../../libs/eventUtil";
import { navBarIconStyles } from "./styles";

const propTypes = {
  icon: PropType.element,
  name: PropType.string,
  onClick: PropType.func,
  size: PropType.string,
};
const useStyles = makeStyles(() => navBarIconStyles);
const NavIcon = ({ icon, name, onClick, size = "large" }) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.iconWrapper)}>
      <IconButton onClick={() => handleFunction(onClick, name)} title={name}>
        <SvgIcon fontSize={size}>{icon}</SvgIcon>
      </IconButton>
    </div>
  );
};

NavIcon.propTypes = propTypes;
export default NavIcon;
