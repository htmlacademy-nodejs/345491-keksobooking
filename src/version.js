'use strict';

const packageInfo = require(`../package.json`);
const {VERSION_TASK: currentTask} = require(`../utils/task-constants`);
const ParentTask = require(`../utils/task-constructor`);

const DESCRIPTION = `program version`;
const MESSAGE = `v${packageInfo.version}`;

const versionTask = new ParentTask(currentTask, DESCRIPTION, MESSAGE);

module.exports = versionTask;
