'use strict';

const packageInfo = require(`../package.json`);
const {AUTHOR_TASK: currentTask} = require(`../utils/task-constants`);
const TaskConstructor = require(`../utils/task-constructor`);

const DESCRIPTION = `name of author`;
const MESSAGE = packageInfo.author;

const authorTask = new TaskConstructor(currentTask, DESCRIPTION, MESSAGE);

module.exports = authorTask;

