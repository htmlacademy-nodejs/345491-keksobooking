'use strict';

const packageInfo = require(`../package.json`);
const {LICENSE_TASK: currentTask} = require(`../utils/task-constants`);
const ParentTask = require(`../utils/task-constructor`);

const DESCRIPTION = `type of license`;
const MESSAGE = packageInfo.license;

const licenseTask = new ParentTask(currentTask, DESCRIPTION, MESSAGE);

module.exports = licenseTask;

