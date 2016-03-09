'use strict';

const chalk = require('chalk');
const log = console.log;

class Logger {
  error(error) {
    log(chalk.red(`ERROR: ${error}`));
    throw new Error(error);
  }

  info(message) {
    log(chalk.cyan(`INFO: ${message}`));
  }

  warn(message) {
    log(chalk.yellow(`WARN: ${message}`));
  }
}

module.exports = new Logger();
