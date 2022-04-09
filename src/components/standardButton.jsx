import React from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { Button as MuiButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { handleFunction } from "../libs/eventUtil";
import { standardButtonStyles as styles } from "./styles";

const propTypes = {
  disabled: PropType.bool,
  isFat: PropType.bool,
  label: PropType.string,
  onClick: PropType.func,
  title: PropType.string,
  variant: PropType.string,
};
const useStyles = makeStyles(() => styles);
const StandardButton = ({
  disabled = false,
  isFat = false,
  label = "",
  onClick = null,
  title = "",
  variant = "outlined",
}) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.stdBtnRoot, isFat && classes.fatBtn)}>
      <MuiButton
        disabled={disabled}
        onClick={(event) => handleFunction(onClick, event)}
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
