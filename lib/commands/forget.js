'use strict';

const Command = require('../models/command');

module.exports = class Forget extends Command {
  constructor() {
    super({
      name: 'forget',
      description: 'Forgets the saved <key> & its <value>',
      example: '@gunther forget "pods"'
    });
  }

  run(options) {

  }
};
