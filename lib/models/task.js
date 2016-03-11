'use strict';

const logger = require('../utilities/logger');

module.exports = class Task {
  run() {
    logger.error('Task should define a `run` method');
    throw new Error();
  }
};
