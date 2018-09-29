'use strict';

const packageInfo = require(`../package.json`);
const {LICENSE_TASK: currentTask} = require(`../utils/task-constants`);
const TaskConstructor = require(`../utils/task-constructor`);

const DESCRIPTION = `type of license`;
const MESSAGE = packageInfo.license;

const licenseTask = new TaskConstructor(currentTask, DESCRIPTION, MESSAGE);

module.exports = licenseTask;

