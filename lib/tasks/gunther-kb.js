'use strict';

const Task = require('../models/task');
const Yam  = require('yam');

module.exports = class GuntherKB extends Task {
  static get kb() {
    return new Yam('gunther-kb');
  }

  learn(options) {
    return new Promise((resolve, reject) => {
      resolve(this.kb.set(options.key, options.value));
    });
  }

  remember(options) {
    return new Promise((resolve, reject) => {
      resolve(this.kb.get(options.key));
    });
  }

  forget(options) {
    return new Promise((resolve, reject) => {
      resolve(this.kb.remove(options.key));
    });
  }

  run(options) {
    return this[options.action](options.commandArgs);
  }
};
