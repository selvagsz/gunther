'use strict';

const Command = require('../models/command');

module.exports = class Remember extends Command {
  constructor() {
    super({
      name: 'remember',
      description: 'Recollects the save information for the passed <key>',
      example: '@gunther remember "pods"'
    });
  }

  run(options) {

  }
};
