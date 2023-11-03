"use strict";

import chalk from "chalk";
import yargs from "yargs";

export default yargs(process.argv.slice(2))
  .usage(
    "Usage:\n" +
      ("" +
        chalk.green.bold(
          "  $0 <module names> [-w | -m | -y | -t] [-s <YYYY-MM-DD>] [-e <YYYY-MM-DD>]\n"
        ))
  )
  .example("" + chalk.green.bold("$0 cmd-ranking -s 2018-01-01"))
  .options({
    s: {
      alias: "start",
      describe: "Specify the start of the period to be counted",
    },
    e: {
      alias: "end",
      describe: "Specify the end of the period to be counted",
    },
    y: {
      alias: "year",
      describe: 'Set "from" 1 year',
      type: "boolean",
    },
    t: {
      alias: "this-year",
      describe: 'Set "from" January 1 of this year',
      type: "boolean",
    },
    m: {
      alias: "month",
      describe: 'Set "from" 1 month',
      type: "boolean",
    },
    w: {
      alias: "week",
      describe: 'Set "from" 1 week',
      type: "boolean",
    },
    h: {
      alias: "help",
      describe: "Show help",
    },
  })
  .locale("en").argv;
