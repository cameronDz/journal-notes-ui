const generateDateString = () => {
  const currDate = new Date();
  return getYear(currDate) + '-' + getMonth(currDate) + '-' + getDay(currDate);
};

const getFullTimeStampString = () => {
  const currDate = new Date();
  const yyyyMMdd = getYear(currDate) + getMonth(currDate) + getDay(currDate);
  const hhmmss = padNumber(currDate.getHours()) + padNumber(currDate.getMinutes()) + padNumber(currDate.getSeconds());
  return yyyyMMdd + hhmmss + currDate.getMilliseconds();
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
  return ('' + value).padStart(2, '0');
};

export { generateDateString, getFullTimeStampString };
