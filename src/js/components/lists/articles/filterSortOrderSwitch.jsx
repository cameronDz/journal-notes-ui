import React from "react";
import PropType from "prop-types";
import { Switch } from "@material-ui/core";

const propTypes = {
  currentOrder: PropType.string,
  disabled: PropType.bool,
  onChange: PropType.func,
  orderName: PropType.string,
  value: PropType.bool,
};

const FilterSortOrderSwitch = ({
  currentOrder = "",
  disabled = true,
  orderName = "",
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
      checked={currentOrder === orderName && value}
      color={"primary"}
      disabled={disabled || currentOrder !== orderName}
      onChange={handleChange}
      value={value}
    />
  );
};

FilterSortOrderSwitch.propTypes = propTypes;
export default FilterSortOrderSwitch;
