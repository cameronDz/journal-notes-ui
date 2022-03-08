import React, { Fragment } from "react";
import PropType from "prop-types";
import { defaultEventEmptyString } from "../../libs/defaults";
import { filterText } from "../../libs/text";
import { handleFunction } from "../../libs/eventUtil";
import { hasItems } from "../../libs/arrays";
import FilterTagList from "./filterTagList";
import FilterTitle from "./filterTitle";

const propTypes = {
  filterTagAvailable: PropType.arrayOf(PropType.string),
  filterTagSelected: PropType.arrayOf(PropType.string),
  onButtonClick: PropType.func,
  onSelectChange: PropType.func,
  tagsAvailable: PropType.arrayOf(PropType.string),
  tagsFilter: PropType.arrayOf(PropType.string),
};
const FilterTagSelector = ({
  filterTagAvailable = [],
  filterTagSelected = [],
  onButtonClick = null,
  onSelectChange = null,
  tagsAvailable = [],
  tagsFilter = [],
}) => {
  const handleChangeSelect = (event, name) => {
    const value = defaultEventEmptyString(event);
    handleFunction(onSelectChange, value, name);
  };

  const seletableTags = Array.isArray(tagsAvailable)
    ? tagsAvailable.filter((tag) => {
        return (
          !!tag &&
          (!Array.isArray(tagsFilter) || tagsFilter.indexOf(tag) === -1)
        );
      })
    : [];
  return (
    <Fragment>
      <FilterTitle title={filterText.title} />
      <FilterTagList
        disabled={!hasItems(filterTagAvailable)}
        id="available-tag-filters"
        labelButton={filterText.add}
        labelList={filterText.available}
        onButtonClick={() => handleFunction(onButtonClick, "add")}
        onSelectChange={(event) => handleChangeSelect(event, "add")}
        tagsCurrent={filterTagAvailable}
        tagsSelectable={seletableTags}
      />
      <FilterTagList
        disabled={!hasItems(filterTagSelected)}
        id="current-tag-filters"
        labelButton={filterText.remove}
        labelList={filterText.current}
        onButtonClick={() => handleFunction(onButtonClick, "remove")}
        onSelectChange={(event) => handleChangeSelect(event, "remove")}
        tagsCurrent={filterTagSelected}
        tagsSelectable={tagsFilter}
      />
    </Fragment>
  );
};

FilterTagSelector.propTypes = propTypes;
export default FilterTagSelector;
