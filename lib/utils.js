import chalk from "chalk";
import {
  format,
  parseISO,
  isValid,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  getYear,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const FORMAT_DATE = "yyyy-MM-dd";

/**
 * show help
 *
 * @param  {String} help message if specifying a message
 * @return {String} full help message
 */
const showHelp = (text) => {
  console.error(
    `${chalk.yellow.bold(text)}run "csm --help" for usage information`,
  );
  process.exit(1);
};

/**
 * get start date by option
 *
 * @param  {String} args
 * @return {String} start date 'yyyy-MM-dd' format
 */
const getStartDate = (args) => {
  // check module names
  if (args._.length === 0) {
    showHelp("Please enter the module names at least one. \n");
  }
  // check start date options
  if (args.s) {
    if (!/\d{4}-\d{2}-\d{2}/.test(args.s)) {
      showHelp("Please enter the date correctly. \n");
    }
    if (!isValid(parseISO(args.s))) {
      showHelp("Please enter the date correctly. \n");
    }
  }
  if (args.m) {
    return format(addMonths(new Date(), -1), FORMAT_DATE);
  }
  if (args.M) {
    return getMonthBounds(args.M, "start");
  }
  if (args.y) {
    return format(addYears(new Date(), -1), FORMAT_DATE);
  }
  if (args.t) {
    return `${getYear(new Date())}-01-01`;
  }
  if (args.w) {
    return format(addWeeks(new Date(), -1), FORMAT_DATE);
  }
  return args.s || format(addDays(new Date(), -1), FORMAT_DATE);
};

/**
 * get end date by option
 *
 * @param  {String} args
 * @return {String} end date 'yyyy-MM-dd' format
 */
const getEndDate = (args) => {
  // check module names
  if (args._.length === 0) {
    showHelp("Please enter the module names at least one. \n");
  }
  if (!args.s && args.e) {
    showHelp(
      "Please enter the start date. \nBecause when using -s option, then start date is required. \n",
    );
  }
  // check end date options
  if (args.e) {
    if (!/\d{4}-\d{2}-\d{2}/.test(args.e)) {
      showHelp("Please enter the date correctly. \n");
    }
    if (!isValid(parseISO(args.e))) {
      showHelp("Please enter the date correctly. \n");
    }
  }
  if (args.M) {
    return getMonthBounds(args.M, "end");
  }

  return args.e || format(new Date(), FORMAT_DATE);
};

/**
 * A method for comparing two values for sorting
 *
 * @param  {Object} first stats object in processing sort function
 * @param  {Object} second stats object in processing sort function
 * @return {Number} 0: equal, 1: a < b, -1: a > b
 */
const compare = (a, b) => {
  if (a.downloads < b.downloads) {
    return 1;
  }
  if (a.downloads > b.downloads) {
    return -1;
  }

  return 0;
};

/**
 * Checks if the given string is a valid month name or its 3-letter abbreviation.
 * The month names and abbreviations are case-insensitive.
 *
 * @param   {string} str - The input string to check.
 * @returns {boolean} - Returns true if the input is a valid month name or abbreviation, false otherwise.
 *
 * @example
 * isMonthName('January');  // true
 * isMonthName('jan');      // true
 * isMonthName('Octob');    // false
 */
const isMonthName = (str) => {
  if (str === undefined || typeof str !== "string") {
    return false;
  }

  const months = [
    "january",
    "jan",
    "february",
    "feb",
    "march",
    "mar",
    "april",
    "apr",
    "may",
    "june",
    "jun",
    "july",
    "jul",
    "august",
    "aug",
    "september",
    "sep",
    "october",
    "oct",
    "november",
    "nov",
    "december",
    "dec",
  ];

  const lowerCaseInput = str.toLowerCase();

  return months.includes(lowerCaseInput);
};

/**
 * Gets the first and last days of the given month.
 *
 * @param {string} str - The input string representing the month.
 * @param {string} type - The type of day to retrieve ('start' or 'end').
 * @returns {Object|null} - Returns an object with the first and last days of the month, or null if the str is invalid.
 *
 * @example
 * getMonthDay('January', 'start');  // '2023-01-01'
 * getMonthDay('jan', 'end');       // '2023-01-31'
 * getMonthDay('Feb', 'start');      // '2023-02-01'
 */
const getMonthBounds = (str, type) => {
  if (typeof str !== "string") {
    showHelp("Please enter the Month correctly. \n");
  }
  if (type !== "start" && type !== "end") {
    console.error(
      chalk.red.bold(
        "Unexpected error: Something went wrong. Please report this issue.\n",
      ),
    );
    process.exit(1);
  }

  // Convert the str to a full month name
  const monthNames = {
    jan: "january",
    feb: "february",
    mar: "march",
    apr: "april",
    may: "may",
    jun: "june",
    jul: "july",
    aug: "august",
    sep: "september",
    oct: "october",
    nov: "november",
    dec: "december",
  };

  let fullMonthName = str.toLowerCase();
  if (fullMonthName.length === 3) {
    fullMonthName = monthNames[fullMonthName];
  }
  if (!isMonthName(fullMonthName)) {
    showHelp("Please enter the Month correctly. \n");
  }

  const currentYear = new Date().getFullYear();
  const dateStr = `${fullMonthName} 1, ${currentYear}`;
  const date = new Date(dateStr);

  if (!isValid(date)) {
    showHelp("Please enter the Month correctly. \n");
  }

  if (type === "start") {
    return format(startOfMonth(date), FORMAT_DATE);
  }
  if (type === "end") {
    return format(endOfMonth(date), FORMAT_DATE);
  }
};

export {
  showHelp,
  getStartDate,
  getEndDate,
  compare,
  isMonthName,
  getMonthBounds,
};
