'use strict';

const Command   = require('../models/command');
const GuntherKB = require('../tasks/gunther-kb');
const merge     = require('lodash.merge');

module.exports = class Forget extends Command {
  static get name() {
    return 'forget';
  }

  constructor(options) {
    options = options || {};
    let properties = {
      name: 'forget',
      description: 'Forgets the saved <key> & its <value>',
      example: '@gunther forget "pods"'
    };

    merge(options, properties);
    super(options);
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
