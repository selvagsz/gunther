'use strict';

const gitlab  = require('node-gitlab');
const Yam     = require('yam');
const logger  = require('../utilities/logger');

let yam = new Yam('gunther');
let privateToken = process.env.PRIVATE_TOKEN || (yam && yam.get('PRIVATE_TOKEN'));
if (!privateToken) {
  logger.error('Gunther requires a private token to respond to you');
}

module.exports = gitlab.createPromise({
  privateToken,
  requestTimeout: 10000
});
