'use strict';

const packageInfo = require(`../package.json`);
const {VERSION_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);

const DESCRIPTION = `program version`;
const MESSAGE = `v${packageInfo.version}`;

class VersionTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, MESSAGE);
  }
}

const versionTask = new VersionTask();

module.exports = versionTask;
