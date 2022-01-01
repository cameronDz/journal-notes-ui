import React from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { IconButton, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { navBarIconStyles } from "./styles";

const propTypes = {
  icon: PropType.element,
  name: PropType.string,
  onClick: PropType.func,
  size: PropType.string,
};

const useStyles = makeStyles(() => navBarIconStyles);
const NavIcon = ({ icon, name, onClick, size = "large" }) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick(name);
    }
  };

  const classes = useStyles();
  return (
    <div className={classNames(classes.iconWrapper)} title={name}>
      <IconButton onClick={() => handleClick()}>
        <SvgIcon fontSize={size}>{icon}</SvgIcon>
      </IconButton>
    </div>
  );
};

NavIcon.propTypes = propTypes;
export default NavIcon;
