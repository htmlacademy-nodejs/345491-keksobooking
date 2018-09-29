'use strict';

const TASK_LIST = require(`../utils/task-constants`);
const TaskConstructor = require(`../utils/task-constructor`);
const versionTask = require(`./version.js`);
const authorTask = require(`./author.js`);
const licenseTask = require(`./license.js`);
const descriptionTask = require(`./description.js`);

const DESCRIPTION = `useful commands`;
const showMessage = (version, author, license, description) => {
  return `Доступные команды:
      ${TASK_LIST.HELP_TASK}    — ${DESCRIPTION};
      ${TASK_LIST.VERSION_TASK} — ${version};
      ${TASK_LIST.AUTHOR_TASK} — ${author};
      ${TASK_LIST.LICENSE_TASK} — ${license};
      ${TASK_LIST.DESCRIPTION_TASK} — ${description};`;
};

const helpTask = new TaskConstructor(TASK_LIST.HELP_TASK, DESCRIPTION, showMessage(versionTask.description, authorTask.description, licenseTask.description, descriptionTask.description));

module.exports = helpTask;

