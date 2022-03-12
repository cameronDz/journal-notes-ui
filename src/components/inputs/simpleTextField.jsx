import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import { TextField } from "@material-ui/core";
import { defaultEventEmptyString } from "../../libs/defaults";
import { handleFunction } from "../../libs/eventUtil";
import { inputTypes } from "../../libs/types";

const propTypes = {
  inputType: PropType.oneOf(Object.values(inputTypes)),
  isDisabled: PropType.bool,
  label: PropType.string,
  name: PropType.string,
  onUpdate: PropType.func,
  options: PropType.object,
  value: PropType.any,
};
const SimpleTextField = ({
  inputType = "",
  isDisabled = false,
  label = "",
  name = "",
  onUpdate = null,
  options = {},
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
    const newDisplay = handleTextOptions(event);
    setDisplay(newDisplay);
    handleFunction(onUpdate, newDisplay);
  };

  const handleChange = (event) => {
    const newDisplay = handleTextOptions(event);
    setDisplay(newDisplay);
  };

  const handleTextOptions = (event) => {
    let newDisplay = defaultEventEmptyString(event);
    if (options?.isTrimmed) {
      newDisplay = newDisplay.trim();
    }
    if (options?.isWhitespaceReplaced) {
      newDisplay = newDisplay.replace(/ /g, `-`);
    }
    return newDisplay;
  };

  return (
    <TextField
      disabled={isDisabled}
      fullWidth={true}
      InputLabelProps={
        inputType === inputTypes.DATE_FIELD ? { shrink: true } : {}
      }
      label={label}
      maxRows={inputType === inputTypes.TEXT_AREA ? 5 : 1}
      minRows={inputType === inputTypes.TEXT_AREA ? 2 : 1}
      multiline={inputType === inputTypes.TEXT_AREA}
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
