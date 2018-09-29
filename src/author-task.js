'use strict';

const packageInfo = require(`../package.json`);
const {AUTHOR_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);

const DESCRIPTION = `name of author`;
const MESSAGE = packageInfo.author;

class AuthorTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, MESSAGE);
  }
}

module.exports = AuthorTask;

