import React, { useState, Fragment } from "react";
import PropType from "prop-types";
import StandardButton from "../standardButton";
import SimpleTextField from "./simpleTextField";
import { defaultDuplicateArray, defaultUniqueArray } from "../../libs/defaults";
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
  options: PropType.object,
};

const ListField = ({
  elementName = "",
  inputType = null,
  isDisabled = false,
  items = [],
  label = "",
  name = "",
  onUpdate = null,
  options = {},
}) => {
  const [display, setDisplay] = useState("");

  const handleAdd = () => {
    let clone = defaultDuplicateArray(items);
    if (elementName) {
      const data = { createDate: new Date() };
      data[elementName] = display;
      clone.push(data);
    } else {
      clone.push(display);
      if (options?.isUniqueSimpleList) {
        clone = defaultUniqueArray(clone);
      }
    }
    handleFunction(onUpdate, clone);
    setDisplay("");
  };

  const handleRemove = async () => {
    let newDisplay = "";
    if (!display) {
      const clone = Array.isArray(items) ? [...items] : [];
      const removedElement = clone.pop();
      newDisplay = elementName ? removedElement[elementName] : removedElement;
      handleFunction(onUpdate, clone);
    } else {
      await navigator.clipboard.writeText(display);
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
          options={options}
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
        label={`${display ? "Clear" : "Remove"} ${label}`}
        onClick={handleRemove}
        variant="text"
      />
    </Fragment>
  );
};

ListField.propTypes = propTypes;
export default ListField;
