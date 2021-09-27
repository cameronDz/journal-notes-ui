import React, { Fragment } from "react";
import PropType from "prop-types";
import FilterTagList from "./filterTagList";
import FilterTitle from "./filterTitle";

const hasItems = (array) => {
  return Array.isArray(array) && array.length > 0;
};

const propTypes = {
  availableTags: PropType.array,
  currentAvailableFilterTag: PropType.array,
  currentSelectedFilterTag: PropType.array,
  filterTags: PropType.array,
  onButtonClick: PropType.func,
  onSelectChange: PropType.func,
};
const textAdd = `Add Filter`;
const textAvailable = `Available Tags`;
const textCurrent = `Current Filter`;
const textRemove = `Remove Filter`;
const textTitle = `Tag Filters`;
const FilterTagSelector = ({
  availableTags = [],
  currentAvailableFilterTag = [],
  currentSelectedFilterTag = [],
  filterTags = [],
  onButtonClick = null,
  onSelectChange = null,
}) => {
  const handleButtonClick = (name) => {
    if (typeof onButtonClick === "function") {
      onButtonClick(name);
    }
  };

  const handleSelectChange = (event, name) => {
    const value = event?.target?.value || "";
    if (value && typeof onSelectChange === "function") {
      onSelectChange(value, name);
    }
  };

  return (
    <Fragment>
      <FilterTitle title={textTitle} />
      <FilterTagList
        disabled={!hasItems(currentAvailableFilterTag)}
        id="available-tag-filters"
        labelButton={textAdd}
        labelList={textAvailable}
        onButtonClick={() => handleButtonClick("add")}
        onSelectChange={(event) => handleSelectChange(event, "add")}
        tagsCurrent={currentAvailableFilterTag}
        tagsSelectable={
          Array.isArray(availableTags) &&
          availableTags.filter((tag) => {
            return (
              !!tag &&
              (!Array.isArray(filterTags) || filterTags.indexOf(tag) === -1)
            );
          })
        }
      />
      <FilterTagList
        disabled={!hasItems(currentSelectedFilterTag)}
        id="current-tag-filters"
        labelButton={textRemove}
        labelList={textCurrent}
        onButtonClick={() => handleButtonClick("remove")}
        onSelectChange={(event) => handleSelectChange(event, "remove")}
        tagsCurrent={currentSelectedFilterTag}
        tagsSelectable={filterTags}
      />
    </Fragment>
  );
};

FilterTagSelector.propTypes = propTypes;
export default FilterTagSelector;
