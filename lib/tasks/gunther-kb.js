'use strict';

const Task = require('../models/task');
const Yam  = require('yam');

class GuntherKB extends Task {
  learn(options) {
    return new Promise((resolve, reject) => {
      this.constructor.kb.set(options.key, options.value);
      resolve();
    });
  }

  remember(options) {
    return new Promise((resolve, reject) => {
      resolve(this.constructor.kb.get(options.key));
    });
  }

  forget(options) {
    return new Promise((resolve, reject) => {
      this.kb.remove(options.key);
      this.kb.flush();
      resolve();
    });
  }

  run(options) {
    return this[options.action](options.commandArgs);
  }
}

GuntherKB.kb = new Yam('gunther-kb', {
  force: true
});

module.exports = GuntherKB;
