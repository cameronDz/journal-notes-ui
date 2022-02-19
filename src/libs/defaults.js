const defaultUniqueArray = (arr) => {
  return [...new Set(Array.isArray(arr) ? arr : [])];
};

const defaultEmptyObject = (obj) => {
  return !!obj && typeof obj === "object" && !Array.isArray(obj) ? obj : {};
};

const defaultEmptyString = (str) => {
  return !!str && typeof str === "string" ? str : "";
};

const defaultEventEmptyString = (evt) => {
  const str = evt?.target?.value;
  return defaultEmptyString(str);
};

export {
  defaultEmptyObject,
  defaultEmptyString,
  defaultEventEmptyString,
  defaultUniqueArray,
};
