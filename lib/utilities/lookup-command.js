'use strict';

module.exports = function(commands, commandName) {
  for (var key in commands) {
    var command = commands[key];

    var name = command.name;
    var aliases = command.aliases || [];

    if (name === commandName || aliases.some((alias) => alias === commandName)) {
      return command;
    }
  }
};
