import { isValidDate } from "./date";

const timing = {
  TEN_SECONDS: 10_000,
  ONE_MINUTE: 60_000,
  FIVE_MINUTES: 300_000,
  TWENTY_FIVE_MINUTES: 1_500_000,
};

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

export { generateTimeString, timing };
