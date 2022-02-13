import { defaultUniqueArray } from "./defaults";
import { journalTypes } from "./types";

const transformValuesToCurrentVersion = (values = null) => {
  let tranformedValues;
  switch (values?.journalType) {
    case journalTypes.ARTICLE:
      tranformedValues = transformArticleValues(values);
      break;
    case journalTypes.BOOK:
      tranformedValues = transformBookValues(values);
      break;
    default:
      tranformedValues = values;
  }
  return tranformedValues;
};

const transformBookValues = (values) => {
  const version = values._version || 0;
  let transformedValues = values;
  if (!version || version === "1.0.0") {
    transformedValues.definitions = defaultUniqueArray(values.definitions);
    transformedValues.resources = defaultUniqueArray(values.resources);
    transformedValues._version = "1.1.0";
  }
  return transformedValues;
};

const transformArticleValues = (values) => {
  const version = values._version || 0;
  let transformedValues = values;
  if (!version || version === "1.0.0") {
    transformedValues.definitions = defaultUniqueArray(values.definitions);
    transformedValues._version = "1.1.0";
  }
  return transformedValues;
};

export { transformValuesToCurrentVersion };
