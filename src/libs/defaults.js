const defaultUniqueArray = (arr) => {
  return [...new Set(Array.isArray(arr) ? arr : [])];
};

export { defaultUniqueArray };
