```
           __                   __                    __            __                                          __            __
  _____   / /_   ___   _____   / /__          _____  / /_  ____ _  / /_   _____          ____ ___   ____   ____/ /  __  __   / /  ___    _____
 / ___/  / __ \ / _ \ / ___/  / //_/ ______  / ___/ / __/ / __ `/ / __/  / ___/ ______  / __ `__ \ / __ \ / __  /  / / / /  / /  / _ \  / ___/
/ /__   / / / //  __// /__   / ,<   /_____/ (__  ) / /_  / /_/ / / /_   (__  ) /_____/ / / / / / // /_/ // /_/ /  / /_/ /  / /  /  __/ (__  )
\___/  /_/ /_/ \___/ \___/  /_/|_|         /____/  \__/  \__,_/  \__/  /____/         /_/ /_/ /_/ \____/ \__,_/   \__,_/  /_/   \___/ /____/
```

[![npm version](https://badge.fury.io/js/check-stats-modules.svg)](https://badge.fury.io/js/check-stats-modules)
[![Build Status](https://travis-ci.org/kkeeth/check-stats-modules.svg?branch=master)](https://travis-ci.org/kkeeth/check-stats-modules)
[![Code Climate](https://codeclimate.com/github/kkeeth/check-stats-modules/badges/gpa.svg)](https://codeclimate.com/github/kkeeth/check-stats-modules)
![node](https://img.shields.io/badge/node-%3E%3D%2012.19.0-brightgreen.svg?style=social)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# check-stats-modules

`check-stats-modules (csm)` is a CLI application that obtains the specified npm module's stats. After specifying the module name and period, the number of downloads during that period is acquired and displayed on the terminal.

## Installation

```cmd
$ npm install -g check-stats-modules
```

## Usage (example)

note: If the `-e` option(end date) is not specified, today's date is automatically specified.

- check the stats of one module from yesterday

```cmd
$ csm check-stats-modules

╔═══════════╤════════════╤════════════╤═════════════════════╗
║ downloads ║ start      ║ end        ║ package             ║
╟───────────┼────────────┼────────────┼─────────────────────╢
║ 41        ║ 2018-09-03 ║ 2018-09-04 ║ check-stats-modules ║
╚═══════════╧════════════╧════════════╧═════════════════════╝
```

- check the stats of two modules from 2020-06-01

```cmd
$ csm cmd-ranking check-stats-modules -s 2020-06-01

╔═══════════╤════════════╤════════════╤═════════════════════╗
║ downloads ║ start      ║ end        ║ package             ║
╟───────────┼────────────┼────────────┼─────────────────────╢
║ 175       ║ 2020-06-01 ║ 2020-10-27 ║ check-stats-modules ║
╟───────────┼────────────┼────────────┼─────────────────────╢
║ 122       ║ 2020-06-01 ║ 2020-10-27 ║ cmd-ranking         ║
╚═══════════╧════════════╧════════════╧═════════════════════╝
```

- check the stats of two modules from last month

```cmd
$ csm cmd-ranking check-stats-modules -m

╔═══════════╤════════════╤════════════╤═════════════════════╗
║ downloads ║ start      ║ end        ║ package             ║
╟───────────┼────────────┼────────────┼─────────────────────╢
║ 42        ║ 2020-09-27 ║ 2020-10-27 ║ check-stats-modules ║
╟───────────┼────────────┼────────────┼─────────────────────╢
║ 19        ║ 2020-09-27 ║ 2020-10-27 ║ cmd-ranking         ║
╚═══════════╧════════════╧════════════╧═════════════════════╝
```

## Options

```
-s, --start      Specify the start of the period to be counted
-e, --end        Specify the end of the period to be counted
-v, --version    Show version number                                 [boolean]
-y, --year       Set "from" 1 year                                   [boolean]
-t, --this-year  Set "from" January 1 of this year                   [boolean]
-m, --month      Set "from" 1 month                                  [boolean]
-w, --week       Set "from" 1 week                                   [boolean]
-h, --help       Show help                                           [boolean]
```

## License

[MIT](https://github.com/kkeeth/check-stats-modules/LICENSE)

# Others

Please write a new [issues](https://github.com/kkeeth/check-stats-modules/issues)! Please send me [PRs](https://github.com/kkeeth/check-stats-modules/pulls)!
