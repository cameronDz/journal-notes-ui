const defaultUniqueArray = (arr) => {
  return [...new Set(Array.isArray(arr) ? arr : [])];
};

const defaultEmptyString = (str) => {
  return !!str && typeof str === "string" ? str : "";
};

export { defaultEmptyString, defaultUniqueArray };
