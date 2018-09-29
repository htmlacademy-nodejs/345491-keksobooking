'use strict';

const packageInfo = require(`../package.json`);
const {VERSION_TASK: currentTask} = require(`../utils/task-constants`);
const TaskConstructor = require(`../utils/task-constructor`);

const DESCRIPTION = `program version`;
const MESSAGE = `v${packageInfo.version}`;

const versionTask = new TaskConstructor(currentTask, DESCRIPTION, MESSAGE);

module.exports = versionTask;
