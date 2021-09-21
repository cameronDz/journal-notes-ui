import React, { useEffect, useState, Fragment } from "react";
import PropType from "prop-types";
import SimpleTextField from "./simpleTextField";
import { handleFunction } from "../../libs/eventUtil";
import { inputType } from "../../libs/types";

const propTypes = {
  isDisabled: PropType.bool,
  onUpdate: PropType.func,
  name: PropType.string,
  title: PropType.string,
  type: PropType.oneOfType(inputType),
  value: PropType.any,
};

const InputContainer = ({ isDisabled, onUpdate, name, title, type, value }) => {
  return (
    <Fragment>
      {type === inputType.DATE_FIELD && (
        <SimpleTextField
          inputType={type}
          isDisabled={isDisabled}
          label={title}
          name={name}
          onUpdate={onUpdate}
          value={value}
        ></SimpleTextField>
      )}
    </Fragment>
  );
};

InputContainer.propTypes = propTypes;
export default InputContainer;
