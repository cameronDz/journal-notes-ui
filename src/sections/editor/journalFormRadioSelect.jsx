import React, { Fragment } from "react";
import PropType from "prop-types";
import { FormControlLabel, Radio } from "@material-ui/core";
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
    if (!!availableTypes[idx]) {
      const label = availableTypes[idx].replace(/_/g, ` `).toLocaleLowerCase();
      buttons.push(
        <FormControlLabel
          control={
            <Radio
              checked={currentType === availableTypes[idx]}
              color="primary"
              disabled={isDisabled}
              onChange={(event) => handleFunction(onTypeChange, event)}
              value={availableTypes[idx]}
            />
          }
          key={availableTypes[idx]}
          label={label}
          labelPlacement="top"
        />
      );
    }
  }
  return <Fragment>{buttons}</Fragment>;
};
JournalFormRadioSelect.propTypes = propTypes;
export default JournalFormRadioSelect;
