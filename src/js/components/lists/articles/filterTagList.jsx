import React, { Fragment } from "react";
import classNames from "classnames";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, InputLabel, Select } from "@material-ui/core";
import { filterTagListStyles } from "./styles";

const propTypes = {
  disabled: PropType.bool,
  id: PropType.string,
  labelButton: PropType.string,
  labelList: PropType.string,
  onButtonClick: PropType.func,
  onSelectChange: PropType.func,
  tagsCurrent: PropType.array,
  tagsSelectable: PropType.array,
};
const useStyles = makeStyles(() => filterTagListStyles);
const FilterTagList = ({
  disabled = true,
  id = "",
  labelButton = "",
  labelList = "",
  onButtonClick = null,
  onSelectChange = null,
  tagsCurrent = [],
  tagsSelectable = [],
}) => {
  const handleButtonClick = (event) => {
    if (typeof onButtonClick === "function") {
      onButtonClick(event);
    }
  };

  const handleSelectChange = (event) => {
    if (typeof onSelectChange === "function") {
      onSelectChange(event);
    }
  };

  const classes = useStyles();
  return (
    <Fragment>
      <FormControl className={classNames(classes?.tagFormControl)}>
        <InputLabel shrink htmlFor={id}>
          {labelList}
        </InputLabel>
        <Select
          className={classNames(classes?.tagSelect)}
          inputProps={{ id }}
          multiple
          native
          onChange={handleSelectChange}
          value={tagsCurrent}
        >
          {Array.isArray(tagsSelectable) &&
            tagsSelectable.map((tag) => {
              return (
                !!tag && (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                )
              );
            })}
        </Select>
        <Button
          className={classNames(classes?.tagButton)}
          color="primary"
          disabled={disabled}
          onClick={handleButtonClick}
          variant="outlined"
        >
          {labelButton}
        </Button>
      </FormControl>
    </Fragment>
  );
};

FilterTagList.propTypes = propTypes;
export default FilterTagList;
