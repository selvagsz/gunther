'use strict';

const path          = require('path');
const globSync      = require('glob').sync;
const stringUtils   = require('ember-cli-string-utils');
const getCallerFile = require('get-caller-file');

module.exports = function requireAsHash(pattern, type) {
  let callerFileDir = path.dirname(getCallerFile());

  return globSync(pattern, {
    cwd: callerFileDir
  }).reduce(function(hash, file) {
    let klass = require(callerFileDir + '/' + file);
    if (!type || (klass.prototype instanceof type)) {
      hash[stringUtils.classify(path.basename(file, '.js'))] = klass;
    }
    return hash;
  }, {});
};
