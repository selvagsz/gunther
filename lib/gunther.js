var gitlab    = require('node-gitlab');
var path      = require('path');
var Yam       = require('yam');

module.exports = Gunther;

function Gunther(data) {
  data = data || {};
  this.data = data;
  this.userName = 'gunther';

  var yam = new Yam('gunther');
  var privateToken = process.env.PRIVATE_TOKEN || (yam && yam.get('PRIVATE_TOKEN'));
  if (!privateToken) {
    throw 'Gunther requires a private token to respond to you';
  }

  this.gitlab = new gitlab.create({
    privateToken: privateToken,
    requestTimeout: 10000
  });
}

Gunther.prototype = {
  feed: function(data) {
    this.data = data;
  },

  respond: function() {
    var webhookType = this.data.object_kind;
    var handlers = {
      note: 'respondToCommentTrigger'
    };
    var method = handlers[webhookType];

    if (method) {
      this[method]();
    }
  },

  respondToCommentTrigger: function() {
    var commentAttributes = this.data.object_attributes;
    var inbox = this.readInbox(commentAttributes.note);
    var command = inbox.command;
    if (command) {
      this.invokeCommand(command);
    }
  },

  stayIdle: function() {
    // Do nothing
    return this;
  },

  readInbox: function(note) {
    var regExp = new RegExp('@' + this.userName);
    var name = note.match(regExp);
    var command;

    if (name) {
      command = (note.split(name)[1] || '').toLowerCase().trim();
    }

    return {
      name: name,
      command: command
    };
  },

  invokeCommand: function(command) {
    var knownActions = {
      reply: 'reply'
    };
    var action = knownActions[command];
    if (action) {
      this[action]();
    }
  },

  reply: function() {
    this.gitlab.mergeRequests.createNote({
      id: this.data.project_id,
      merge_request_id: this.data.merge_request.id,
      body: 'Hola Bola! :D'
    }, function() {
      //
    });
  }
};
