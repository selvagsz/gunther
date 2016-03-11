'use strict';

const Command   = require('../models/command');
const GuntherKB = require('../tasks/gunther-kb');

module.exports = class Forget extends Command {
  static get name() {
    return 'forget';
  }

  constructor() {
    super({
      name: 'forget',
      description: 'Forgets the saved <key> & its <value>',
      example: '@gunther forget "pods"'
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
      action: 'forget',
      commandArgs
    });
  }
};
