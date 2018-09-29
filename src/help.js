'use strict';

const TASK_LIST = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);
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

class HelpTask extends BaseTask {
  constructor() {
    super(TASK_LIST.HELP_TASK, DESCRIPTION, showMessage(versionTask.description, authorTask.description, licenseTask.description, descriptionTask.description));
  }
}

const helpTask = new HelpTask();

module.exports = helpTask;

