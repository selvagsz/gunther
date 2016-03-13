'use strict';

const Command     = require('../models/command');
const GuntherKB   = require('../tasks/gunther-kb');
const PostComment = require('../tasks/comment');
const merge       = require('lodash.merge');

module.exports = class Remember extends Command {
  static get name() {
    return 'remember';
  }

  constructor(options) {
    options = options || {};
    let properties = {
      name: 'remember',
      description: 'Recollects the save information for the passed <key>',
      example: '@gunther remember "pods"'
    };

    merge(options, properties);
    super(options);
  }

  parseArgs(args) {
    return {
      key: args.trim()
    };
  }

  run(commandArgs, payload) {
    let guntherKB = new GuntherKB();
    return guntherKB.run({
      action: 'remember',
      commandArgs
    }).then((value) => {
      let postComment = new PostComment({
        gunther: this.gunther
      });

      return postComment.run({
        message: value
      }, payload);
    });
  }
};
