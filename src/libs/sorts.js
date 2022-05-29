const order = {
  neutral: 0,
  firstValueGreater: -1,
  secondValueGreater: 1,
};

const sortByDate = (a = "", b = "") => {
  let sortValue = sortByBooleanValues(a, b);
  if (!sortValue) {
    const aTime = new Date(a).getTime();
    const bTime = new Date(b).getTime();
    sortValue = sortNaNValues(aTime, bTime);
    if (!sortValue) {
      if (aTime > bTime) {
        sortValue = order.firstValueGreater;
      } else if (aTime < bTime) {
        sortValue = order.secondValueGreater;
      }
    }
  }
  return sortValue;
};

const sortByCreatedDate = (a = "", b = "") => {
  const aValue = a?.createdDate || "";
  const bValue = b?.createdDate || "";
  let val = sortByDate(aValue, bValue);
  if (val === order.neutral) {
    const aTime = a?.createdTime || "";
    const bTime = b?.createdTime || "";
    if (aTime && bTime) {
      val = sortByDate(`${aValue} ${aTime}`, `${bValue} ${bTime}`);
    }
  }
  return val;
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
  if (sortValue === order.neutral) {
    if (aValue < bValue) {
      sortValue = order.secondValueGreater;
    } else if (aValue > bValue) {
      sortValue = order.firstValueGreater;
    }
  }
  return sortValue;
};

const sortByTitle = (a, b) => {
  return sortByReverseTitle(b, a);
};

const sortByBooleanValues = (a, b) => {
  let sortValue = order.neutral;
  if (!!a !== !!b) {
    sortValue = a ? order.firstValueGreater : order.secondValueGreater;
  }
  return sortValue;
};

const sortNaNValues = (a, b) => {
  let sortValue = order.neutral;
  if (!isNaN(a) && isNaN(b)) {
    sortValue = order.firstValueGreater;
  } else if (isNaN(a) && !isNaN(b)) {
    sortValue = order.secondValueGreater;
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
