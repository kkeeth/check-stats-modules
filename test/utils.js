import { jest } from "@jest/globals";
import chalk from "chalk";
import { isLeapYear } from "date-fns";
import {
  getStartDate,
  getEndDate,
  compare,
  isMonthName,
  getMonthBounds,
} from "../lib/utils.js";

const date = String(new Date().getDate());
const month = String(new Date().getMonth());
const todayDate = date.length === 2 ? date : `0${date}`;
const todayMonth = month.length === 2 ? month : `0${month}`;
const yesterdayDate = date.length === 2 ? String(date - 1) : `0${date - 1}`;

const errorMessages = {
  dateFormatError: chalk.yellow.bold("Please enter the date correctly. \n"),
  moduleNameNull: chalk.yellow.bold(
    "Please enter the module names at least one. \n",
  ),
  notSpecifiedOption: chalk.yellow.bold(
    "Please enter the start date. \nBecause when using -s option, then start date is required. \n",
  ),
  startLaterThanEnd: chalk.yellow.bold(
    "The start date is specified to be later than the end date. \n",
  ),
  invalidMonth: chalk.yellow.bold("Please enter the Month correctly. \n"),
  invalidType: chalk.red.bold(
    "Unexpected error: Something went wrong. Please report this issue.\n",
  ),
};
const helpMessage = `run "csm --help" for usage information`;

const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});
const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

afterAll(() => {
  mockConsoleError.mockRestore();
  mockExit.mockRestore();
});

// As these options are only processing of external libraries, check only one
// 'week', 'month', 'year'
describe("-m option tests", () => {
  test.concurrent("check start date when -m option", () => {
    const argsStub = {
      s: false,
      e: false,
      m: true,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };

    const actual = getStartDate(argsStub);

    expect(typeof actual).toBe("string");
    expect(actual.length).toBe(10);
    expect(actual.split("-")[1]).toBe(todayMonth);
  });
});

describe("-t option tests", () => {
  test.concurrent("check start date when -t option", () => {
    const argsStub = {
      s: false,
      e: false,
      m: false,
      y: false,
      t: true,
      w: false,
      _: ["check-stats-modules"],
    };
    const actual = getStartDate(argsStub);

    expect(typeof actual).toBe("string");
    expect(actual.length).toBe(10);
    expect(actual.split("-")[1]).toBe("01");
    expect(actual.split("-")[2]).toBe("01");
  });
});

describe("-s option tests", () => {
  test.concurrent(
    "check start date when specify correct date with -s option",
    () => {
      const argsStub = {
        s: "2018-05-03",
        e: false,
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };
      const actual = getStartDate(argsStub);

      expect(typeof actual).toBe("string");
      expect(actual.length).toBe(10);
      expect(actual).toBe(argsStub.s);
    },
  );

  test.concurrent(
    "check start date when specify empty string with -s option",
    () => {
      const argsStub = {
        s: "",
        e: false,
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };
      const actual = getStartDate(argsStub);

      expect(typeof actual).toBe("string");
      expect(actual.length).toBe(10);
      expect(actual.split("-")[2]).toBe(yesterdayDate);
    },
  );

  test.concurrent(
    "check start date when specify incorrect date with -s option",
    () => {
      const argsStub = {
        s: "2018-",
        e: false,
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };

      expect(() => getStartDate(argsStub)).toThrow("process.exit called");
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.dateFormatError + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );

  test.concurrent(
    "check start date when specify not exist date with -s option",
    () => {
      const argsStub = {
        s: "2018-15-89",
        e: false,
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };

      expect(() => getStartDate(argsStub)).toThrow("process.exit called");
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.dateFormatError + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );

  test.concurrent(
    "check start date when specify symbols with -s option",
    () => {
      const argsStub = {
        s: '!"#$%&()',
        e: false,
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };

      expect(() => getStartDate(argsStub)).toThrow("process.exit called");
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.dateFormatError + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );

  test.concurrent("check start date when specify with no options", () => {
    const argsStub = {
      s: false,
      e: false,
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };
    const actual = getStartDate(argsStub);

    expect(typeof actual).toBe("string");
    expect(actual.length).toBe(10);
    expect(actual.split("-")[2]).toBe(yesterdayDate);
  });
});

describe("-s and -e option tests", () => {
  test.concurrent(
    "check end date when specify correct date with -s and -e option",
    () => {
      const argsStub = {
        s: "2018-05-03",
        e: "2019-12-08",
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };
      const actual = getEndDate(argsStub);

      expect(typeof actual).toBe("string");
      expect(actual.length).toBe(10);
      expect(actual === "2019-12-08");
      expect(actual).toBe(argsStub.e);
    },
  );

  test.concurrent(
    "check end date when specify correct date with -s option, but specify empty string with -e option",
    () => {
      const argsStub = {
        s: "2018-05-03",
        e: "",
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };
      const actual = getEndDate(argsStub);

      expect(typeof actual).toBe("string");
      expect(actual.length).toBe(10);
      expect(actual.split("-")[2] === todayDate);
    },
  );

  test.concurrent(
    "check start date when specify correct date with -s option, but specify incorrect date with -e option",
    () => {
      const argsStub = {
        s: "2018-05-03",
        e: "2019-",
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };

      expect(() => getEndDate(argsStub)).toThrow("process.exit called");
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.dateFormatError + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );

  test.concurrent(
    "check start date when specify correct date with -s option, but specify not exist date with -e option",
    () => {
      const argsStub = {
        s: "2018-05-03",
        e: "2019-15-89",
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };

      expect(() => getEndDate(argsStub)).toThrow("process.exit called");
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.dateFormatError + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );

  test.concurrent(
    "check start date when does not specify -s option and specify correct date with -e option",
    () => {
      const argsStub = {
        s: false,
        e: "2019-12-08",
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };

      expect(() => getEndDate(argsStub)).toThrow("process.exit called");
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.dateFormatError + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );

  test.concurrent(
    "check start date when specify correct date with -s option, but specify symbols with -e option",
    () => {
      const argsStub = {
        s: "2018-05-03",
        e: '!"#$%&()',
        m: false,
        y: false,
        t: false,
        w: false,
        _: ["check-stats-modules"],
      };

      expect(() => getEndDate(argsStub)).toThrow("process.exit called");
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.dateFormatError + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );
});

describe("other test cases", () => {
  test.concurrent("check when module name is not specified", () => {
    const argsStub = {
      s: "2019-08-30",
      e: false,
      m: false,
      y: false,
      t: false,
      w: false,
      _: [],
    };

    expect(() => getStartDate(argsStub)).toThrow("process.exit called");
    expect(mockConsoleError).toHaveBeenCalledWith(
      errorMessages.dateFormatError + helpMessage,
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});

describe("compare function tests", () => {
  test.concurrent(
    "check return value is 1 when the downloads of the first argument is greater than that of the second",
    () => {
      const arg1 = {
        downloads: 25,
        start: "2020-08-20",
        end: "2020-09-20",
        package: "check-stats-modules",
      };
      const arg2 = {
        downloads: 150,
        start: "2020-08-20",
        end: "2020-09-20",
        package: "riot-barcode",
      };

      const expected = 1;
      const actual = compare(arg1, arg2);

      expect(expected).toBe(actual);
    },
  );

  test.concurrent(
    "check return value is -1 when the downloads of the first argument is less than that of the second",
    () => {
      const arg1 = {
        downloads: 150,
        start: "2020-08-20",
        end: "2020-09-20",
        package: "riot-barcode",
      };
      const arg2 = {
        downloads: 25,
        start: "2020-08-20",
        end: "2020-09-20",
        package: "check-stats-modules",
      };

      const expected = -1;
      const actual = compare(arg1, arg2);

      expect(expected).toBe(actual);
    },
  );
});

describe("isMonthName function tests", () => {
  test.concurrent(
    "check that true is returned when the -M option is specified",
    () => {
      let argsStub = "January";
      let actual = isMonthName(argsStub);
      expect(actual).toBe(true);

      argsStub = "jan";
      actual = isMonthName(argsStub);
      expect(actual).toBe(true);

      argsStub = "Feb";
      actual = isMonthName(argsStub);
      expect(actual).toBe(true);

      argsStub = "DeCemBEr";
      actual = isMonthName(argsStub);
      expect(actual).toBe(true);
    },
  );

  test.concurrent(
    "check that false is returned when the -M option is specified but the argument is not a month name",
    () => {
      let argsStub = "Januar";
      let actual = isMonthName(argsStub);
      expect(actual).toBe(false);

      argsStub = "xyz";
      actual = isMonthName(argsStub);
      expect(actual).toBe(false);

      argsStub = true;
      actual = isMonthName(argsStub);
      expect(actual).toBe(false);

      argsStub = "";
      actual = isMonthName(argsStub);
      expect(actual).toBe(false);
    },
  );
});

describe("getMonthBounds function tests", () => {
  test.concurrent(
    "check that the start and end dates of the month are returned when the -M option is specified",
    () => {
      let argsStub1 = "January";
      let argsStub2 = "start";
      let actual = getMonthBounds(argsStub1, argsStub2);
      expect(actual).toBe(`${new Date().getFullYear()}-01-01`);

      argsStub1 = "Feb";
      argsStub2 = "end";
      actual = getMonthBounds(argsStub1, argsStub2);
      const tmpDate = new Date();
      expect(actual).toBe(
        `${tmpDate.getFullYear()}-02-${isLeapYear(tmpDate) ? 29 : 28}`,
      );

      argsStub1 = "DeCemBEr";
      argsStub2 = "end";
      actual = getMonthBounds(argsStub1, argsStub2);
      expect(actual).toBe(`${new Date().getFullYear()}-12-31`);
    },
  );

  test.concurrent(
    "check the error message is returned when the -M option is specified but the argument is not a month name",
    () => {
      let monthStr = "Januar";
      let type = "start";
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.invalidMonth + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);

      monthStr = "xyz";
      type = "end";
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.invalidMonth + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);

      monthStr = true;
      type = "start";
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.invalidMonth + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);

      monthStr = "";
      type = "end";
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(
        errorMessages.invalidMonth + helpMessage,
      );
      expect(mockExit).toHaveBeenCalledWith(1);

      monthStr = "AUgust";
      type = "xyz";
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(errorMessages.invalidType);
      expect(mockExit).toHaveBeenCalledWith(1);

      monthStr = "June";
      type = false;
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(errorMessages.invalidType);
      expect(mockExit).toHaveBeenCalledWith(1);

      monthStr = "NOVember";
      type = undefined;
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(errorMessages.invalidType);
      expect(mockExit).toHaveBeenCalledWith(1);

      monthStr = "NOVember";
      type = "";
      expect(() => getMonthBounds(monthStr, type)).toThrow(
        "process.exit called",
      );
      expect(mockConsoleError).toHaveBeenCalledWith(errorMessages.invalidType);
      expect(mockExit).toHaveBeenCalledWith(1);
    },
  );
});
