import React, { Fragment } from "react";
import PropType from "prop-types";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@material-ui/core";
import { handleFunction } from "../../libs/eventUtil";
import { sortText } from "../../libs/text";
import FilterTitle from "./filterTitle";

const propTypes = {
  checkedCreatedDate: PropType.bool,
  checkedPublishDate: PropType.bool,
  checkedTitle: PropType.bool,
  isLoading: PropType.bool,
  onOrderChange: PropType.func,
  onTypeChange: PropType.func,
  orderType: PropType.string,
};
const FilterSortOrder = ({
  checkedCreatedDate = false,
  checkedPublishDate = false,
  checkedTitle = false,
  isLoading = false,
  onOrderChange = null,
  onTypeChange = null,
  orderType = "title",
}) => {
  const getDisplayLabel = (type, checked) => {
    const title = checked ? sortText.ascend : sortText.descend;
    return orderType === type ? title : ``;
  };

  const getSwitch = (keyName = "", checkName = "", checkValue = false) => {
    return (
      !!keyName &&
      !!checkName && (
        <Switch
          checked={orderType === keyName && checkValue}
          color={"primary"}
          disabled={orderType !== keyName}
          onChange={() => handleFunction(onOrderChange, checkName)}
          value={checkName}
        />
      )
    );
  };

  return (
    <Fragment>
      <FilterTitle title={sortText.title} />
      <FormControl>
        <RadioGroup
          name={"orderType"}
          style={{ marginRight: "16px" }}
          title={"Order Type"}
          value={orderType}
          onChange={(event) => handleFunction(onTypeChange, event)}
        >
          <FormControlLabel
            control={<Radio color={"primary"} />}
            disabled={isLoading}
            label={"Title"}
            value={"title"}
          />
          <FormControlLabel
            control={<Radio color={"primary"} />}
            disabled={isLoading}
            label={"Created Date"}
            value={"createdDate"}
          />
          <FormControlLabel
            control={<Radio color={"primary"} />}
            disabled={isLoading}
            label={"Publish Date"}
            value={"publishedDate"}
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormControlLabel
          control={getSwitch("title", "checkedTitle", checkedTitle)}
          disabled={isLoading || orderType !== "title"}
          label={getDisplayLabel("title", checkedTitle)}
          style={{ padding: "2px" }}
        />
        <FormControlLabel
          control={getSwitch(
            "createdDate",
            "checkedCreatedDate",
            checkedCreatedDate
          )}
          disabled={isLoading || orderType !== "createdDate"}
          label={getDisplayLabel("createdDate", checkedCreatedDate)}
          style={{ padding: "2px" }}
        />
        <FormControlLabel
          control={getSwitch(
            "publishedDate",
            "checkedPublishDate",
            checkedPublishDate
          )}
          disabled={isLoading || orderType !== "publishedDate"}
          label={getDisplayLabel("publishedDate", checkedPublishDate)}
          style={{ padding: "2px" }}
        />
      </FormControl>
    </Fragment>
  );
};

FilterSortOrder.propTypes = propTypes;
export default FilterSortOrder;
