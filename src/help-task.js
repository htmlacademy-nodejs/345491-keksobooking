'use strict';

const TASK_LIST = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);
const VersionTask = require(`./version-task.js`);
const AuthorTask = require(`./author-task`);
const LicenseTask = require(`./license-task`);
const DescriptionTask = require(`./description-task`);

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
    super(TASK_LIST.HELP_TASK, DESCRIPTION, showMessage(new VersionTask().description, new AuthorTask().description, new LicenseTask().description, new DescriptionTask().description));
  }
}

module.exports = HelpTask;

