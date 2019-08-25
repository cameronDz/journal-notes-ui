import get from 'lodash.get';

const sortByDate = (a = '', b = '') => {
  let aDate, bDate;
  try {
    aDate = new Date(a);
    bDate = new Date(b);
  } catch(error) {
    return 0;
  }
  if (aDate > bDate) {
    return -1;
  } else if (aDate < bDate) {
    return 1;
  }
  return 0;
};

const sortByCreatedDate = (a = '', b = '') => {
  const aValue = get(a, 'createdDate', '');
  const bValue = get(b, 'createdDate', '');
  return sortByDate(aValue, bValue);
};

const sortByPublishDate = (a, b) => {
  const aValue = get(a, 'publishDate', '');
  const bValue = get(b, 'publishDate', '');
  return sortByDate(aValue, bValue);
};

const sortByTitle = (a, b) => {
  const aValue = get(a, 'title', '');
  const bValue = get(b, 'title', '');
  if (aValue < bValue) {
    return -1;
  } else if (aValue > bValue) {
    return 1;
  }
  return 0;
};

export {
  sortByCreatedDate,
  sortByPublishDate,
  sortByTitle
};
