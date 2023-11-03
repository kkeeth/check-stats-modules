"use strict";

import npm from "npm-stats-api";
import chalk from "chalk";
import args from "./args.js";
import json2table from "./json2table.js";
import { showHelp, getStartDate, getEndDate, compare } from "./utils.js";

/**
 * show stats about modules
 * (this is the main function)
 *
 * @param  void
 * @return void
 */
export default () => {
  // set start date
  const start = getStartDate(args);
  const end = getEndDate(args);
  const stats = [];

  if (`${new Date(start)}` === "Invalid Date") {
    showHelp(start);
    return;
  }
  if (`${new Date(end)}` === "Invalid Date") {
    showHelp(end);
    return;
  }

  // start date > end date
  if (new Date(start).getTime() > new Date(end).getTime()) {
    showHelp("The start date is specified to be later than the end date. \n\n");
    return;
  }

  for (let mod of args._) {
    npm
      .stat(mod, start, end)
      .then((res) => {
        stats.push(res.body);
      })
      .catch((err) => {
        stats.push({
          downloads: chalk.red.bold(err.body.error),
          start: start,
          end: end,
          package: mod,
        });
      })
      .finally(() => {
        if (args._.length === stats.length) {
          // sort by downloads number
          stats.sort(compare);
          // Formatted and displayed in table format
          const ret = json2table(stats);
          ret.show();
        }
      });
  }
};
