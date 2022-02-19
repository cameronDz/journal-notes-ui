const defaultUniqueArray = (arr) => {
  return [...new Set(Array.isArray(arr) ? arr : [])];
};

const defaultEmptyString = (str) => {
  return !!str && typeof str === "string" ? str : "";
};

const defaultEventEmptyString = (evt) => {
  const str = evt?.target?.value;
  return defaultEmptyString(str);
};

export { defaultEmptyString, defaultEventEmptyString, defaultUniqueArray };
