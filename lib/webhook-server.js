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
    }).listen(7777);

    logger.info('Gitlab Hook Server running at http://0.0.0.0:7777/webhook');
    this.listen('error', (error) => {
      logger.error(error.message);
    });
  }

  listen(eventName, callback) {
    this.handler.on(eventName, (event) => {
      callback(event);
    });
  }
};
