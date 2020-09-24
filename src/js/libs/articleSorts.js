import get from 'lodash.get';

const NEUTRAL = 0;
const FIRST_VALUE_GREATER = -1;
const SECOND_VALUE_GREATER = 1;

const sortByDate = (a = '', b = '') => {
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

const sortByCreatedDate = (a = '', b = '') => {
  const aValue = get(a, 'createdDate', '');
  const bValue = get(b, 'createdDate', '');
  return sortByDate(aValue, bValue);
};

const sortByReverseCreatedDate = (a, b) => {
  return sortByCreatedDate(b, a);
};

const sortByPublishDate = (a, b) => {
  const aValue = get(a, 'publishDate', '');
  const bValue = get(b, 'publishDate', '');
  return sortByDate(aValue, bValue);
};

const sortByReversePublishDate = (a, b) => {
  return sortByPublishDate(b, a);
};

const sortByTitle = (a, b) => {
  const aValue = get(a, 'title', '');
  const bValue = get(b, 'title', '');
  let sortValue = NEUTRAL;
  if (aValue < bValue) {
    sortValue = SECOND_VALUE_GREATER;
  } else if (aValue > bValue) {
    sortValue = FIRST_VALUE_GREATER;
  }
  return sortValue;
};

const sortByReverseTitle = (a, b) => {
  return sortByTitle(b, a);
};

const sortByBooleanValues = (a, b) => {
  let sortValue = NEUTRAL;
  if (!!a !== !!b) {
    sortValue = !!a ? FIRST_VALUE_GREATER : SECOND_VALUE_GREATER;
  }
  return sortValue;
}

const sortNaNValues = (a, b) => {
  let sortValue = NEUTRAL;
  if (!isNaN(a) && isNaN(b)) {
    sortValue = FIRST_VALUE_GREATER;
  } else if (isNaN(a) && !isNaN(b)) {
    sortValue = SECOND_VALUE_GREATER;
  }
  return sortValue;
}

const isNaN = (value) => {
  return (typeof value === 'number' && value !== value)
}

export {
  sortByCreatedDate,
  sortByPublishDate,
  sortByTitle,
  sortByReverseCreatedDate,
  sortByReversePublishDate,
  sortByReverseTitle
};
