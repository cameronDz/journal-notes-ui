import React, { useState, Fragment } from "react";
import PropType from "prop-types";
import StandardButton from "../sections/input/standardButton";
import SimpleTextArea from "./simpleTextArea";
import SimpleTextField from "./simpleTextField";
import { handleFunction } from "../../libs/eventUtil";
import { inputTypes } from "../../libs/types";

const propTypes = {
  isDisabled: PropType.bool,
  label: PropType.string,
  name: PropType.string,
  onUpdate: PropType.func,
  inputType: PropType.oneOfType(inputTypes),
  items: PropType.arrayOf(PropType.any),
};

const ListField = ({
  isDisabled = false,
  label = "",
  name = "",
  onUpdate = null,
  inputType = null,
  items = [],
}) => {
  const [display, setDisplay] = useState("");

  const handleAdd = () => {
    const clone = Array.isArray(items) ? [...items] : [];
    clone.push(display);
    handleFunction(onUpdate, clone);
    setDisplay("");
  };

  const handleRemove = () => {
    let newDisplay = "";
    if (!display) {
      const clone = Array.isArray(items) ? [...items] : [];
      newDisplay = clone.pop();
      handleFunction(onUpdate, clone);
    }
    setDisplay(newDisplay);
  };

  return (
    <Fragment>
      {inputType === inputTypes.TEXT_FIELD_LIST && (
        <SimpleTextField
          disabled={isDisabled}
          inputType={inputTypes.TEXT_FIELD}
          label={label}
          name={name}
          onUpdate={(event) => setDisplay(event)}
          value={display}
        />
      )}
      {inputType === inputTypes.TEXT_AREA_LIST && (
        <SimpleTextArea
          disabled={isDisabled}
          label={label}
          name={name}
          onUpdate={(event) => setDisplay(event)}
          value={display}
        />
      )}

      <StandardButton
        disabled={isDisabled || !display}
        label={`Add ${label}`}
        onClick={handleAdd}
        variant="text"
      />
      <StandardButton
        disabled={isDisabled || (!items && !items?.length)}
        label={`${!!display ? "Clear" : "Remove"} ${label}`}
        onClick={handleRemove}
        variant="text"
      />
    </Fragment>
  );
};

ListField.propTypes = propTypes;
export default ListField;
