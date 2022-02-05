import { journalTypes } from "./types";

const transformValuesToCurrentVersion = (values = null) => {
  let tranformedValues;
  switch (values?.journalType) {
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
    transformedValues.definitions = [];
    transformedValues.resources = [];
    transformedValues._version = journalTypes.BOOK._version;
  }
  return transformedValues;
};

export { transformValuesToCurrentVersion };
