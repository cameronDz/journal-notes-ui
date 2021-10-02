import React, { Fragment } from "react";
import PropType from "prop-types";
import { Radio } from "@material-ui/core";
import { handleFunction } from "../../libs/eventUtil";

const propTypes = {
  availableTypes: PropType.array,
  currentType: PropType.any,
  isDisabled: PropType.bool,
  onTypeChange: PropType.func,
};

const JournalFormRadioSelect = ({
  availableTypes,
  currentType,
  isDisabled,
  onTypeChange,
}) => {
  const buttons = [];
  const length = availableTypes?.length || 0;
  for (let idx = 0; idx < length; idx++) {
    buttons.push(
      <Radio
        checked={currentType === availableTypes[idx]}
        disabled={isDisabled}
        onChange={(event) => handleFunction(onTypeChange, event)}
        value={availableTypes[idx]}
      />
    );
  }
  return <Fragment>{buttons}</Fragment>;
};
JournalFormRadioSelect.propTypes = propTypes;
export default JournalFormRadioSelect;
