'use strict';

const Task = require('../models/task');

module.exports = class Comment extends Task {
  run(options, payload) {
    return this.gunther.gitlab.issues.createNote({
      id: payload.project_id,
      issue_id: payload.issue.id,
      body: options.message
    });
  }
};
