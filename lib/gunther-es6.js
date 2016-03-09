'use strict';

const gitlab        = require('node-gitlab');
const logger        = require('./utilities/logger');
const WebhookServer = require('./webhook-server');

module.exports = class Gunther {
  constructor() {
    this.userName = 'gunther';
    this.gitlab = gitlab;
  }

  run() {
    let webhookServer = new WebhookServer({
      path: '/webhook'
    });

    webhookServer.start();
    webhookServer.listen('comments', this.commentEventHandler);
  }

  commentEventHandler(event) {

  }
};
