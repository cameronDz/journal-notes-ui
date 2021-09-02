import React from "react";
import PropType from "prop-types";
import { Switch } from "@material-ui/core";

const propTypes = {
  disabled: PropType.bool,
  onChange: PropType.func,
  value: PropType.bool,
};

const FilterSortOrderSwitch = ({
  disabled = true,
  onChange = null,
  value = false,
}) => {
  const handleChange = (event) => {
    if (typeof onChange === "function") {
      onChange(event);
    }
  };
  return (
    <Switch
      checked={value}
      color={"primary"}
      disabled={disabled}
      onChange={handleChange}
      value={value}
    />
  );
};

FilterSortOrderSwitch.propTypes = propTypes;
export default FilterSortOrderSwitch;
