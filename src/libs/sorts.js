const NEUTRAL = 0;
const FIRST_VALUE_GREATER = -1;
const SECOND_VALUE_GREATER = 1;

const sortByDate = (a = "", b = "") => {
  let sortValue = sortByBooleanValues(a, b);
  if (!sortValue) {
    const aTime = new Date(a).getTime();
    const bTime = new Date(b).getTime();
    sortValue = sortNaNValues(aTime, bTime);
    if (!sortValue) {
      if (aTime > bTime) {
        sortValue = FIRST_VALUE_GREATER;
      } else if (aTime < bTime) {
        sortValue = SECOND_VALUE_GREATER;
      }
    }
  }
  return sortValue;
};

const sortByCreatedDate = (a = "", b = "") => {
  const aValue = a?.createdDate || "";
  const bValue = b?.createdDate || "";
  return sortByDate(aValue, bValue);
};

const sortByReverseCreatedDate = (a, b) => {
  return sortByCreatedDate(b, a);
};

const sortByPublishDate = (a, b) => {
  const aValue = a?.publishDate || "";
  const bValue = b?.publishDate || "";
  return sortByDate(aValue, bValue);
};

const sortByReversePublishDate = (a, b) => {
  return sortByPublishDate(b, a);
};

const sortByReverseTitle = (a, b) => {
  const aValue = a?.title || "";
  const bValue = b?.title || "";
  let sortValue = sortByBooleanValues(bValue, aValue);
  if (sortValue === NEUTRAL) {
    if (aValue < bValue) {
      sortValue = SECOND_VALUE_GREATER;
    } else if (aValue > bValue) {
      sortValue = FIRST_VALUE_GREATER;
    }
  }
  return sortValue;
};

const sortByTitle = (a, b) => {
  return sortByReverseTitle(b, a);
};

const sortByBooleanValues = (a, b) => {
  let sortValue = NEUTRAL;
  if (!!a !== !!b) {
    sortValue = a ? FIRST_VALUE_GREATER : SECOND_VALUE_GREATER;
  }
  return sortValue;
};

const sortNaNValues = (a, b) => {
  let sortValue = NEUTRAL;
  if (!isNaN(a) && isNaN(b)) {
    sortValue = FIRST_VALUE_GREATER;
  } else if (isNaN(a) && !isNaN(b)) {
    sortValue = SECOND_VALUE_GREATER;
  }
  return sortValue;
};

const isNaN = (value) => {
  return typeof value === "number" && value !== value;
};

export {
  sortByCreatedDate,
  sortByPublishDate,
  sortByTitle,
  sortByReverseCreatedDate,
  sortByReversePublishDate,
  sortByReverseTitle,
};
