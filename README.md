[![npm version](https://badge.fury.io/js/check-stats-modules.svg)](https://badge.fury.io/js/check-stats-modules)
![node](https://img.shields.io/badge/node-%3E%3D%208.0.0-brightgreen.svg?style=social)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# check-stats-modules

`check-stats-modules (csm)` is is a CLI application that obtains the specified npm module's stats. After specifying the module name and period, the number of downloads during that period is acquired and displayed on the terminal.

## Installation

```cmd
$ npm install -g check-stats-modules
```

## Usage (example)

* check the stats of one module from yesterday

```cmd
$ csm cmd-ranking

  {"downloads":0,"start":"2018-08-22","end":"2018-08-23","package":"cmd-ranking"}
```

* check the stats of two modules from 2018-01-01

```cmd
$ csm cmd-ranking check-stats-modules -f 2018-01-01

  {"downloads":399,"start":"2018-01-01","end":"2018-08-26","package":"cmd-ranking"}

  {"downloads":50,"start":"2018-01-01","end":"2018-08-26","package":"check-stats-modules"}
```

* check the stats of two modules from last month

```cmd
$ csm cmd-ranking check-stats-modules -m

  {"downloads":96,"start":"2018-07-26","end":"2018-08-26","package":"cmd-ranking"}

  {"downloads":50,"start":"2018-07-26","end":"2018-08-26","package":"check-stats-modules"}
```

## Options

```
-f, --from        Specify the from of the period to be counted
-v, --version     Show version number
-y, --year        Set "from" 1 year
-m, --month       Set "from" 1 month
-h, --help        Show help
```

## License

[MIT](https://github.com/k-kuwahara/check-stats-modules/LICENSE)

# Others
Please write a new [issues](https://github.com/k-kuwahara/check-stats-modules/issues)! Please send me [PRs](https://github.com/k-kuwahara/check-stats-modules/pulls)!
