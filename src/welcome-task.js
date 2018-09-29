'use strict';

const WELCOME_MESSAGE = require(`../utils/task-constants`).WELCOME_MESSAGE;
const currentTask = ``;
const BaseTask = require(`../utils/task-constructor`);

const DESCRIPTION = `welcome`;

class WelcomeTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, WELCOME_MESSAGE);
  }
}

module.exports = WelcomeTask;
