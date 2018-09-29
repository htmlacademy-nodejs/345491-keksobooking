'use strict';

const packageInfo = require(`../package.json`);
const {DESCRIPTION_TASK: currentTask} = require(`../utils/task-constants`);
const TaskConstructor = require(`../utils/task-constructor`);

const DESCRIPTION = `some information`;
const MESSAGE = packageInfo.description;

const descriptionTask = new TaskConstructor(currentTask, DESCRIPTION, MESSAGE);

module.exports = descriptionTask;

