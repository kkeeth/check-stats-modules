import { getStartDate, getEndDate, compare, isMonthName } from "../lib/utils.js";

const date = String(new Date().getDate());
const month = String(new Date().getMonth());
const todayDate = date.length === 2 ? date : `0${date}`;
const todayMonth = month.length === 2 ? month : `0${month}`;
const yesterdayDate = date.length === 2 ? String(date - 1) : `0${date - 1}`;

const errorMessages = {
  dateFormatError: "Please enter the date correctly. \n",
  moduleNameNull: "Please enter the module names at least one. \n",
  notSpecifiedOption:
    "Please enter the start date. \nBecause when using -s option, then start date is required. \n",
};

// As these options are only processing of external libraries, check only one
// 'week', 'month', 'year'
test.concurrent("check start date when -m option", async () => {
  const argsStub = {
    s: false,
    e: false,
    m: true,
    y: false,
    t: false,
    w: false,
    _: ["check-stats-modules"],
  };

  const actual = await getStartDate(argsStub);

  expect(typeof actual).toBe("string");
  expect(actual.length).toBe(10);
  expect(actual.split("-")[1]).toBe(todayMonth);
});

test.concurrent("check start date when -t option", async () => {
  const argsStub = {
    s: false,
    e: false,
    m: false,
    y: false,
    t: true,
    w: false,
    _: ["check-stats-modules"],
  };
  const actual = await getStartDate(argsStub);

  expect(typeof actual).toBe("string");
  expect(actual.length).toBe(10);
  expect(actual.split("-")[1]).toBe("01");
  expect(actual.split("-")[2]).toBe("01");
});

test.concurrent(
  "check start date when specify correct date with -s option",
  async (t) => {
    const argsStub = {
      s: "2018-05-03",
      e: false,
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };
    const actual = await getStartDate(argsStub);

    expect(typeof actual).toBe("string");
    expect(actual.length).toBe(10);
    expect(actual).toBe(argsStub.s);
  }
);

test.concurrent(
  "check start date when specify empty string with -s option",
  async () => {
    const argsStub = {
      s: "",
      e: false,
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };
    const actual = await getStartDate(argsStub);

    expect(typeof actual).toBe("string");
    expect(actual.length).toBe(10);
    expect(actual.split("-")[2]).toBe(yesterdayDate);
  }
);

test.concurrent(
  "check start date when specify incorrect da with -s option",
  async () => {
    const argsStub = {
      s: "2018-",
      e: false,
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };
    const error = await getStartDate(argsStub);

    expect(error).toBe(errorMessages.dateFormatError);
  }
);

test.concurrent(
  "check start date when specify not exist da with -s option",
  async () => {
    const argsStub = {
      s: "2018-15-89",
      e: false,
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };

    const error = await getStartDate(argsStub);

    expect(error).toBe(errorMessages.dateFormatError);
  }
);

test.concurrent(
  "check start date when specify symbols with -s option",
  async () => {
    const argsStub = {
      s: '!"#$%&()',
      e: false,
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };

    const error = await getStartDate(argsStub);

    expect(error).toBe(errorMessages.dateFormatError);
  }
);

test.concurrent("check start date when specify with no options", async () => {
  const argsStub = {
    s: false,
    e: false,
    m: false,
    y: false,
    t: false,
    w: false,
    _: ["check-stats-modules"],
  };
  const actual = await getStartDate(argsStub);

  expect(typeof actual).toBe("string");
  expect(actual.length).toBe(10);
  expect(actual.split("-")[2]).toBe(yesterdayDate);
});

test.concurrent(
  "check end date when specify correct date with -s and -e option",
  async () => {
    const argsStub = {
      s: "2018-05-03",
      e: "2019-12-08",
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };
    const actual = await getEndDate(argsStub);

    expect(typeof actual).toBe("string");
    expect(actual.length).toBe(10);
    expect(actual === "2019-12-08");
    expect(actual).toBe(argsStub.e);
  }
);

test.concurrent(
  "check end date when specify correct date with -s option, but specify empty string with -e option",
  async () => {
    const argsStub = {
      s: "2018-05-03",
      e: "",
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };
    const actual = await getEndDate(argsStub);

    expect(typeof actual).toBe("string");
    expect(actual.length).toBe(10);
    expect(actual.split("-")[2] === todayDate);
  }
);

test.concurrent(
  "check start date when specify correct date with -s option, but specify incorrect date with -e option",
  async () => {
    const argsStub = {
      s: "2018-05-03",
      e: "2019-",
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };
    const error = await getEndDate(argsStub);

    expect(error).toBe(errorMessages.dateFormatError);
  }
);

test.concurrent(
  "check start date when specify correct date with -s option, but specify not exist date with -e option",
  async () => {
    const argsStub = {
      s: "2018-05-03",
      e: "2019-15-89",
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };

    const error = await getEndDate(argsStub);

    expect(error).toBe(errorMessages.dateFormatError);
  }
);

test.concurrent(
  "check start date when does not specify -s option and specify correct date with -e option",
  async (t) => {
    const argsStub = {
      s: false,
      e: "2019-12-08",
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };

    const error = await getEndDate(argsStub);

    expect(error).toBe(errorMessages.notSpecifiedOption);
  }
);

test.concurrent(
  "check start date when specify correct date with -s option, but specify symbols with -e option",
  async (t) => {
    const argsStub = {
      s: "2018-05-03",
      e: '!"#$%&()',
      m: false,
      y: false,
      t: false,
      w: false,
      _: ["check-stats-modules"],
    };

    const error = await getEndDate(argsStub);

    expect(error).toBe(errorMessages.dateFormatError);
  }
);

test.concurrent("check when module name is not specified", async (t) => {
  const argsStub = {
    s: "2019-08-30",
    e: false,
    m: false,
    y: false,
    t: false,
    w: false,
    _: [],
  };

  const error = await getStartDate(argsStub);

  expect(error).toBe(errorMessages.moduleNameNull);
});

test.concurrent(
  "check return value is 1 when the downloads of the first argument is greater than that of the second",
  async (t) => {
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
  }
);

test.concurrent(
  "check return value is -1 when the downloads of the first argument is less than that of the second",
  async (t) => {
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
  }
);

test.concurrent(
  "check that true is returned when the -M option is specified",
  async (t) => {
     let argsStub = 'January';
    let actual = await isMonthName(argsStub);
    expect(actual).toBe(true);

    argsStub = 'jan';
    actual = await isMonthName(argsStub);
    expect(actual).toBe(true);

    argsStub = 'Feb';
    actual = await isMonthName(argsStub);
    expect(actual).toBe(true);

    argsStub = 'DeCemBEr';
    actual = await isMonthName(argsStub);
    expect(actual).toBe(true);
  }
)

test.concurrent(
  "check that false is returned when the -M option is specified but the argument is not a month name",
  async (t) => {
    let argsStub = 'Januar';
    let actual = await isMonthName(argsStub);
    expect(actual).toBe(false);

    argsStub = 'xyz';
    actual = await isMonthName(argsStub);
    expect(actual).toBe(false);

    argsStub = true;
    actual = await isMonthName(argsStub);
    expect(actual).toBe(false);
  }
)