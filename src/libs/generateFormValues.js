import { v4 as uuidv4 } from "uuid";
import { generateDateString } from "./date";
import { generateTimeString } from "./time";
import { generationTypes } from "./types";

const generateFormValues = (inputs, defaultValues = {}) => {
  const values = {};
  const length = Array.isArray(inputs) ? inputs.length : 0;
  for (let idx = 0; idx < length; idx++) {
    const name = inputs[idx]?.name;
    const value = defaultValues?.[name];
    if (name) {
      values[name] = value || inputs[idx].defaultValue;
      if (isUndefined(values[name])) {
        values[name] = defaultType(
          inputs[idx].generationType,
          inputs[idx].defaultValue
        );
      }
    }
  }
  return values;
};

const isUndefined = (value) => {
  return value === undefined;
};

const defaultType = (type, defValue = "") => {
  let value;
  switch (type) {
    case generationTypes.CURRENT_DATE:
      value = generateDateString();
      break;
    case generationTypes.CURRENT_TIME:
      value = generateTimeString();
      break;
    case generationTypes.EMPTY_ARRAY:
      value = [];
      break;
    case generationTypes.EMPTY_DATE:
      value = "";
      break;
    case generationTypes.EMPTY_STRING:
      value = "";
      break;
    case generationTypes.NULL:
      value = null;
      break;
    case generationTypes.PRESET:
      value = defValue || "";
      break;
    case generationTypes.UUID:
      value = uuidv4();
      break;
    default:
      value = "";
  }
  return value;
};

export { generateFormValues };
