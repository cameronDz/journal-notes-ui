import React, { Fragment } from "react";
import PropType from "prop-types";
import SimpleTextField from "./simpleTextField";
import { inputTypes } from "../../libs/types";

const propTypes = {
  isDisabled: PropType.bool,
  onUpdate: PropType.func,
  name: PropType.string,
  title: PropType.string,
  type: PropType.oneOfType(inputTypes),
  value: PropType.any,
};
const simpleFields = [
  inputTypes.DATE_FIELD,
  inputTypes.PASSWORD_FIELD,
  inputTypes.TEXT_FIELD,
];
const InputContainer = ({ isDisabled, onUpdate, name, title, type, value }) => {
  return (
    <Fragment>
      {simpleFields.indexOf(type) > -1 && (
        <SimpleTextField
          inputType={type}
          isDisabled={isDisabled}
          label={title}
          name={name}
          onUpdate={onUpdate}
          value={value}
        ></SimpleTextField>
      )}
      {type === inputTypes.TEXT_FIELD_LIST && <div>{`${name}: ${value}`}</div>}
      {type === inputTypes.TEXT_AREA && <div>{`${name}: ${value}`}</div>}
      {type === inputTypes.TEXT_AREA_LIST && <div>{`${name}: ${value}`}</div>}
    </Fragment>
  );
};

InputContainer.propTypes = propTypes;
export default InputContainer;
