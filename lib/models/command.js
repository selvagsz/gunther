'use strict';

const path          = require('path');
const getCallerFile = require('get-caller-file');
const logger        = require('../utilities/logger');
const merge         = require('lodash.merge');

module.exports = class Command {
  static get aliases() {
    return [];
  }

  constructor(options) {
    options = options || {};
    merge(this, options);
  }

  static parseArgs(args) {

  }

  beforeRun() {

  }

  run() {
    logger.error('Command should define a `run` method');
    throw new Error();
  }

  validateAndRun(commandArgs, payload) {
    let commandOptions = this.parseArgs(commandArgs);
    return new Promise((resolve, reject) => {
      return this.run(commandOptions, payload);
    });
  }

  printHelp() {

  }
};
