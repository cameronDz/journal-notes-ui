import React, { useState, Fragment } from "react";
import PropType from "prop-types";
import StandardButton from "../sections/input/standardButton";
import SimpleTextField from "./simpleTextField";
import { handleFunction } from "../../libs/eventUtil";
import { inputTypes } from "../../libs/types";

const propTypes = {
  elementName: PropType.string,
  inputType: PropType.oneOf(Object.values(inputTypes)),
  isDisabled: PropType.bool,
  items: PropType.arrayOf(PropType.any),
  label: PropType.string,
  name: PropType.string,
  onUpdate: PropType.func,
};

const ListField = ({
  elementName = "",
  inputType = null,
  isDisabled = false,
  items = [],
  label = "",
  name = "",
  onUpdate = null,
}) => {
  const [display, setDisplay] = useState("");

  const handleAdd = () => {
    const clone = Array.isArray(items) ? [...items] : [];
    if (!!elementName) {
      const data = { createDate: new Date() };
      data[elementName] = display;
      clone.push(data);
    } else {
      clone.push(display);
    }
    handleFunction(onUpdate, clone);
    setDisplay("");
  };

  const handleRemove = () => {
    let newDisplay = "";
    if (!display) {
      const clone = Array.isArray(items) ? [...items] : [];
      const removedElement = clone.pop();
      newDisplay = !!elementName ? removedElement[elementName] : removedElement;
      handleFunction(onUpdate, clone);
    }
    setDisplay(newDisplay);
  };

  const textFields = [inputTypes.TEXT_FIELD_LIST, inputTypes.TEXT_AREA_LIST];
  return (
    <Fragment>
      {textFields.indexOf(inputType) > -1 && (
        <SimpleTextField
          inputType={
            inputType === inputTypes.TEXT_AREA_LIST
              ? inputTypes.TEXT_AREA
              : inputTypes.TEXT_FIELD
          }
          isDisabled={isDisabled}
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
        disabled={isDisabled || (!display && !items?.length)}
        label={`${!!display ? "Clear" : "Remove"} ${label}`}
        onClick={handleRemove}
        variant="text"
      />
    </Fragment>
  );
};

ListField.propTypes = propTypes;
export default ListField;
