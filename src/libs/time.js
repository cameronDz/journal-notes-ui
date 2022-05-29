import { isValidDate } from "./date";

/**
 * formatted date into time stamp
 * @param {string} dateString date object string representation
 * @returns UTC time stirng in format hh:mm:ss
 */
const generateTimeString = (dateString = null) => {
  const date = getValidDate(dateString);
  return date.toISOString().split("T")[1].split(".")[0];
};

const getValidDate = (dateString = null) => {
  let val;
  const date = new Date(dateString);
  if (dateString && isValidDate(date)) {
    const offset = date.getTimezoneOffset() * 60_000;
    const utcDate = new Date(date.toUTCString());
    return new Date(utcDate.getTime() - offset);
  } else {
    val = new Date();
  }
  return val;
};

export { generateTimeString };
