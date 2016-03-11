'use strict';

const Command = require('../models/command');
const GuntherKB = require('../tasks/gunther-kb');

module.exports = class Remember extends Command {
  static get name() {
    return 'remember';
  }

  constructor() {
    super({
      name: 'remember',
      description: 'Recollects the save information for the passed <key>',
      example: '@gunther remember "pods"'
    });
  }

  parseArgs(args) {
    return {
      key: args.trim()
    };
  }

  run(commandArgs, payload) {
    let guntherKB = new GuntherKB();
    return guntherKB.run({
      action: 'remember',
      commandArgs
    });
  }
};
