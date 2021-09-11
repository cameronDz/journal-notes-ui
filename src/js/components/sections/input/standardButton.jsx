import React from "react";
import PropType from "prop-types";
import { Button as MuiButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { standardButtonStyles } from "./styles";

const propTypes = {
  disabled: PropType.bool,
  label: PropType.string,
  onClick: PropType.func,
  title: PropType.string,
  variant: PropType.string,
};

const useStyles = makeStyles(() => standardButtonStyles);
const StandardButton = ({
  disabled = false,
  label = "",
  onClick = null,
  title = "",
  variant = "outlined",
}) => {
  const classes = useStyles();
  const handleClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event);
    }
  };
  return (
    <div className={classes?.standardButtonRoot}>
      <MuiButton
        disabled={disabled}
        onClick={handleClick}
        title={title}
        variant={variant}
      >
        {label}
      </MuiButton>
    </div>
  );
};

StandardButton.propTypes = propTypes;
export default StandardButton;
