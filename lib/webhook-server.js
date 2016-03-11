'use strict';

const http            = require('http');
const webhookHandler  = require('gitlab-webhook-handler');
const logger          = require('./utilities/logger');

module.exports = class Webhook {
  constructor(options) {
    this.handler = webhookHandler({
      path: options.path
    });
  }

  start() {
    http.createServer((request, response) => {
      this.handler(request, response, (error) => {
        response.statusCode = 404;
        response.end('no such location');
      });
    }).listen(3000, '192.168.234.226');

    logger.info('Gitlab Hook Server running at http://192.168.234.226:3000/webhook');
    this.listen('error', (error) => {
      logger.error(error.message);
    });
  }

  listen(eventName, thisArg, callback) {
    this.handler.on(eventName, (event) => {
      callback.call(thisArg, event);
    });
  }
};
