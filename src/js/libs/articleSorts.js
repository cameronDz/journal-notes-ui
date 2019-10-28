import get from 'lodash.get';

const sortByDate = (a = '', b = '') => {
  let sortValue = 0;
  try {
    const aDate = new Date(a);
    const bDate = new Date(b);
    if (aDate > bDate) {
      sortValue = -1;
    } else if (aDate < bDate) {
      sortValue = 1;
    }
  } catch (error) {
    console.error('could not get date value', error);
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
  let sortValue = 0;
  if (aValue < bValue) {
    sortValue = -1;
  } else if (aValue > bValue) {
    sortValue = 1;
  }
  return sortValue;
};

const sortByReverseTitle = (a, b) => {
  return sortByTitle(b, a);
};

export {
  sortByCreatedDate,
  sortByPublishDate,
  sortByTitle,
  sortByReverseCreatedDate,
  sortByReversePublishDate,
  sortByReverseTitle
};
