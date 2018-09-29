'use strict';

const WELCOME_MESSAGE = require(`../utils/task-constants`).WELCOME_MESSAGE;

module.exports = {
  name: `welcome`,
  description: ``,
  execute() {
    console.log(WELCOME_MESSAGE);
  }
};
