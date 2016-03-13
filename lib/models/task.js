'use strict';

const logger  = require('../utilities/logger');
const merge   = require('lodash.merge');

module.exports = class Task {
  constructor(options) {
    options = options || {};
    merge(this, options);
  }

  run() {
    logger.error('Task should define a `run` method');
    throw new Error();
  }
};
