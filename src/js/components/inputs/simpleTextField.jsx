import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import { TextField } from "@material-ui/core";
import { handleFunction } from "../../libs/eventUtil";
import { inputTypes } from "../../libs/types";

const propTypes = {
  fullWidth: PropType.bool,
  isDisabled: PropType.bool,
  label: PropType.string,
  name: PropType.string,
  onUpdate: PropType.func,
  inputType: PropType.oneOfType(inputTypes),
  value: PropType.any,
};
const SimpleTextField = ({
  fullWidth = true,
  isDisabled = false,
  label = "",
  name = "",
  onUpdate = null,
  inputType,
  value = "",
}) => {
  const [display, setDisplay] = useState("");
  const [type, setType] = useState("text");

  useEffect(() => {
    setDisplay(value || "");
  }, [value]);

  useEffect(() => {
    let newType = "text";
    if (inputType === inputTypes.DATE_FIELD) {
      newType = "date";
    } else if (inputType === inputTypes.PASSWORD_FIELD) {
      newType = "password";
    }
    setType(newType);
  }, [inputType]);

  const handleBlur = (event) => {
    const newDisplay = updateDisplay(event);
    handleFunction(onUpdate, newDisplay);
  };

  const handleChange = (event) => {
    updateDisplay(event);
  };

  const updateDisplay = (event) => {
    const newDisplay = event?.target?.value || null;
    setDisplay(newDisplay);
    return newDisplay;
  };

  return (
    <TextField
      disabled={isDisabled}
      fullWidth={fullWidth}
      InputLabelProps={type === inputType.DATE_FIELD ? { shrink: true } : {}}
      label={label}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      type={type}
      value={display}
    />
  );
};

SimpleTextField.propTypes = propTypes;
export default SimpleTextField;
