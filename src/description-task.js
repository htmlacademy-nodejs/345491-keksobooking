'use strict';

const packageInfo = require(`../package.json`);
const {DESCRIPTION_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);

const DESCRIPTION = `some information`;
const MESSAGE = packageInfo.description;

class DescriptionTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, MESSAGE);
  }
}

module.exports = DescriptionTask;

