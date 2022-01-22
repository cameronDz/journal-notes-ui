import React, { Fragment } from "react";
import PropType from "prop-types";
import ListField from "./listField";
import SimpleTextField from "./simpleTextField";
import { inputTypes } from "../../libs/types";
import { handleFunction } from "../../libs/eventUtil";

const propTypes = {
  elementName: PropType.string,
  isDisabled: PropType.bool,
  onUpdate: PropType.func,
  name: PropType.string,
  title: PropType.string,
  type: PropType.oneOf(Object.values(inputTypes)),
  value: PropType.any,
};
const simpleFields = [
  inputTypes.DATE_FIELD,
  inputTypes.PASSWORD_FIELD,
  inputTypes.TEXT_AREA,
  inputTypes.TEXT_FIELD,
];
const listFields = [inputTypes.TEXT_AREA_LIST, inputTypes.TEXT_FIELD_LIST];
const InputContainer = ({
  elementName,
  isDisabled,
  onUpdate,
  name,
  title,
  type,
  value,
}) => {
  return (
    <Fragment>
      {simpleFields.indexOf(type) > -1 && (
        <SimpleTextField
          inputType={type}
          isDisabled={isDisabled}
          label={title}
          name={name}
          onUpdate={(update) => handleFunction(onUpdate, update)}
          value={value}
        />
      )}
      {listFields.indexOf(type) > -1 && (
        <ListField
          elementName={elementName}
          inputType={type}
          isDisabled={isDisabled}
          items={value}
          label={title}
          name={name}
          onUpdate={onUpdate}
        />
      )}
    </Fragment>
  );
};

InputContainer.propTypes = propTypes;
export default InputContainer;