'use strict';

const gitlab        = require('./gitlab');
const logger        = require('./utilities/logger');
const WebhookServer = require('./webhook-server');
const requireAsHash = require('./utilities/require-as-hash');
const Command       = require('./models/command');
const commands      = requireAsHash('./commands/*.js', Command);
const lookupCommand = require('./utilities/lookup-command');

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
    webhookServer.listen('note', this, this.handleIssueComments);
  }

  handleIssueComments(event) {
    let payload = event.payload;
    let comment = payload.object_attributes.note || '';
    let matches = /(@[a-z]+)\s+([a-z]+)(..*)*/.exec(comment);
    let taggedName = matches[1].substring(1, matches[1].length);
    let commandName = matches[2];
    let commandArgs = (matches[3] || '').trim();

    if (taggedName === this.userName) {
      let CurrentCommand = lookupCommand(commands, commandName);

      let command = new CurrentCommand({
        gunther: this
      });

      return command.validateAndRun(commandArgs, payload);
    }
  }
};
