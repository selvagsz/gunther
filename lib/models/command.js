'use strict';

const path          = require('path');
const getCallerFile = require('get-caller-file');
const logger        = require('../utilities/logger');

module.exports = class Command {
  static get aliases() {
    return [];
  }

  constructor(options) {
    this.name = options.name || path.basename(getCallerFile(), '.js');
    this.aliases = options.aliases || [];
    this.description = options.description || '';
    this.example = options.example || '';
    this.gunther = options.gunther;
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
