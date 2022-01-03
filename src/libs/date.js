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

const getDateDisplay = (dateString = null) => {
  let display = "";
  const date = new Date(dateString);
  if (isValidDate(date)) {
    const options = {};
    display = date.toLocaleDateString("en-US", options);
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

export { getDateDisplay, generateDateString, getFullTimeStampString };
