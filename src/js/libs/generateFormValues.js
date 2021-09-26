import { v4 as uuidv4 } from "uuid";
import { inputTypes } from "./types";

const generateFormValues = (inputs, defaultValues = {}) => {
  const values = {};
  const length = Array.isArray(inputs) ? inputs.length : 0;
  for (let idx = 0; idx < length; idx++) {
    const name = inputs[idx]?.name;
    const value = defaultValues?.[name];
    if (!!name) {
      values[name] = value;
      if (isUndefined(values[name])) {
        values[name] = name === "id" ? uuidv4() : defaultType(inputs[idx].type);
      }
    }
  }
  return values;
};

const isUndefined = (value) => {
  return value === undefined;
};

const defaultType = (type) => {
  let value;
  switch (type) {
    case inputTypes.DATE_FIELD:
      value = null;
      break;
    case inputTypes.HIDDEN:
      value = "";
      break;
    case inputTypes.NONE:
      value = null;
      break;
    case inputTypes.PASSWORD_FIELD:
      value = "";
      break;
    case inputTypes.TEXT_AREA:
      value = "";
      break;
    case inputTypes.TEXT_AREA_LIST:
      value = [];
      break;
    case inputTypes.TEXT_FIELD_LIST:
      value = [];
      break;
    case inputTypes.TEXT_FIELD:
      value = "";
      break;
    default:
      value = "";
  }
  return value;
};

export { generateFormValues };
