import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import { TextareaAutosize } from "@material-ui/core";
import { handleFunction } from "../../libs/eventUtil";

const propTypes = {
  isDisabled: PropType.bool,
  label: PropType.string,
  name: PropType.string,
  onUpdate: PropType.func,
  value: PropType.any,
};
const SimpleTextArea = ({
  isDisabled = false,
  label = "",
  name = "",
  onUpdate = null,
  value = "",
}) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay(value || "");
  }, [value]);

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
    <TextareaAutosize
      maxRows={3}
      disabled={isDisabled}
      fullWidth={true}
      label={label}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      value={display}
    />
  );
};

SimpleTextArea.propTypes = propTypes;
export default SimpleTextArea;
