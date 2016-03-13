'use strict';

const http            = require('http');
const webhookHandler  = require('gitlab-webhook-handler');
const logger          = require('../utilities/logger');
const Yam             = require('yam');

let yam = new Yam('gunther');
let webhookURL = process.env.WEBHOOK_URL || (yam && yam.get('WEBHOOK_URL')) || '0.0.0.0';
let webhookPort = process.env.WEBHOOK_PORT || (yam && yam.get('WEBHOOK_PORT')) || 3000;

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
    }).listen(webhookPort, webhookURL);

    logger.info(`Gitlab Webhook Server running at ${webhookURL}:${webhookPort}/webhook`);
    this.listen('error', (error) => {
      logger.error(error.message);
    });
  }

  listen(eventName, thisArg, callback) {
    this.handler.on(eventName, (hook) => {
      let project = hook.payload.project;
      logger.info(`Received ${hook.event} in ${project.namespace}/${project.name}`);
      callback.call(thisArg, hook);
    });
  }
};
