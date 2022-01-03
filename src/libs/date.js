const generateDateString = () => {
  const currDate = new Date();
  return getYear(currDate) + "-" + getMonth(currDate) + "-" + getDay(currDate);
};

const getFullTimeStampString = () => {
  const currDate = new Date();
  const yyyyMMdd = getYear(currDate) + getMonth(currDate) + getDay(currDate);
  const hhmmss =
    padNumber(currDate.getHours()) +
    padNumber(currDate.getMinutes()) +
    padNumber(currDate.getSeconds());
  return yyyyMMdd + hhmmss + currDate.getMilliseconds();
};

/**
 * formatted date
 * @param {*} dateString string value of UTC date as "YYYY-MM-DD"
 * @returns UTC display of date as "MMMM DD, YYYY"
 */
const getDateDisplay = (dateString = null) => {
  let display = "";
  const date = new Date(dateString);
  if (isValidDate(date)) {
    const year = date.getUTCFullYear();
    const day = date.getUTCDate();
    const month = dateFullMonths[date.getUTCMonth()];
    display = `${month} ${day}, ${year}`;
  }
  return display;
};

const getYear = (date) => {
  return date.getFullYear();
};

const getMonth = (date) => {
  return padNumber(date.getMonth() + 1);
};

const getDay = (date) => {
  return padNumber(date.getDate());
};

const padNumber = (value) => {
  return ("" + value).padStart(2, "0");
};

const isValidDate = (date = null) => {
  return (
    typeof date === "object" &&
    typeof date.getTime === "function" &&
    typeof date.getTime() === "number"
  );
};

const dateFullMonths = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export { getDateDisplay, generateDateString, getFullTimeStampString };
