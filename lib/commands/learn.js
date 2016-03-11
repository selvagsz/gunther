'use strict';

const Command   = require('../models/command');
const GuntherKB = require('../tasks/gunther-kb');

module.exports = class Learn extends Command {
  static get name() {
    return 'learn';
  }

  constructor() {
    super({
      name: 'learn',
      description: 'Learns the passed <key> & <value> pair which can be recollected with `remember` command',
      example: '@gunther learn "pods" "https://speakerdeck.com/rwjblue/a-tale-of-two-pods"'
    });
  }

  parseArgs(args) {
    let commandArgs = args.trim().split(' ');
    return {
      key: commandArgs[0],
      value: commandArgs[1]
    };
  }

  run(commandArgs, payload) {
    let guntherKB = new GuntherKB();
    return guntherKB.run({
      action: 'learn',
      commandArgs
    });
  }
};
