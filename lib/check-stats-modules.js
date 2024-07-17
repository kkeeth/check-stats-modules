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
  let total = 0;

  // start date > end date
  if (new Date(start).getTime() > new Date(end).getTime()) {
    console.log("＼( 'ω')／ウオオオオオアアアーーーッ！");
    showHelp("The start date is specified to be later than the end date. \n");
  }

  for (const mod of args._) {
    npm
      .stat(mod, start, end)
      .then(({ body: stat }) => {
        stats.push({
          package: mod,
          start: start,
          end: end,
          downloads: stat.downloads,
        });
        total += stat.downloads;
      })
      .catch(({ body }) => {
        stats.push({
          package: mod,
          start: start,
          end: end,
          downloads: chalk.red.bold(body.error),
        });
      })
      .finally(() => {
        if (args._.length === stats.length) {
          // sort by downloads number
          stats.sort(compare);
          if (args.T || args.total) {
            stats.push({
              package: chalk.green.bold("Total"),
              start: chalk.green.bold(start),
              end: chalk.green.bold(end),
              downloads: chalk.green.bold(total),
            });
          }
          // Formatted and displayed in table format
          const ret = json2table(stats);
          ret.show();
        }
      });
  }
};
