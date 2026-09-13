import React, { Fragment, useEffect, useState } from "react";
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

const ListFieldV2 = ({
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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const textInputType =
    inputType === inputTypes.TEXT_AREA_LIST
      ? inputTypes.TEXT_AREA
      : inputTypes.TEXT_FIELD;

  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= items.length) {
      setSelectedIndex(null);
      setDisplay("");
    }
  }, [items.length, selectedIndex]);

  const getItemValue = (item) =>
    elementName ? item?.[elementName] || "" : item;

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setDisplay(getItemValue(items[index]));
  };

  const handleAdd = () => {
    let clone = defaultDuplicateArray(items);
    if (elementName) {
      clone.push({ createDate: new Date(), [elementName]: display });
    } else {
      clone.push(display);
      if (options?.isUniqueSimpleList) {
        clone = defaultUniqueArray(clone);
      }
    }
    handleFunction(onUpdate, clone);
    setDisplay("");
    setSelectedIndex(null);
  };

  const handleUpdate = () => {
    if (selectedIndex === null) {
      return;
    }
    const clone = defaultDuplicateArray(items);
    clone[selectedIndex] = elementName
      ? { ...clone[selectedIndex], [elementName]: display }
      : display;
    handleFunction(onUpdate, clone);
    setDisplay("");
    setSelectedIndex(null);
  };

  const handleRemove = () => {
    if (selectedIndex === null) {
      return;
    }
    const clone = defaultDuplicateArray(items);
    clone.splice(selectedIndex, 1);
    handleFunction(onUpdate, clone);
    setDisplay("");
    setSelectedIndex(null);
  };

  const hasDisplay = !!display;
  return (
    <Fragment>
      {Array.isArray(items) && items.length > 0 && (
        <div style={{ maxHeight: "180px", overflowY: "auto" }}>
          {items.map((item, index) => (
            <StandardButton
              disabled={isDisabled}
              key={`${index}-${getItemValue(item)}`}
              label={`${index + 1}. ${getItemValue(item)}`}
              onClick={() => handleSelect(index)}
              title={selectedIndex === index ? "Selected item" : "Select item"}
              variant={selectedIndex === index ? "contained" : "text"}
            />
          ))}
        </div>
      )}
      <SimpleTextField
        inputType={textInputType}
        isDisabled={isDisabled}
        label={label}
        name={name}
        onUpdate={setDisplay}
        options={options}
        value={display}
      />
      <StandardButton
        disabled={isDisabled || !hasDisplay || selectedIndex !== null}
        label={`Add New ${label}`}
        onClick={handleAdd}
        variant="text"
      />
      <StandardButton
        disabled={isDisabled || !hasDisplay || selectedIndex === null}
        label={`Update ${label}`}
        onClick={handleUpdate}
        variant="text"
      />
      <StandardButton
        disabled={isDisabled || selectedIndex === null}
        label={`Remove ${label}`}
        onClick={handleRemove}
        variant="text"
      />
    </Fragment>
  );
};

ListFieldV2.propTypes = propTypes;
export default ListFieldV2;
