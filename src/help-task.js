'use strict';

const colors = require(`colors/safe`);

const TASK_LIST = require(`../utils/task-constants`).Tasks;
const BaseTask = require(`../utils/task-constructor`);
const VersionTask = require(`./version-task.js`);
const AuthorTask = require(`./author-task`);
const LicenseTask = require(`./license-task`);
const DescriptionTask = require(`./description-task`);

const DESCRIPTION = `useful commands`;
const showMessage = (version, author, license, description) => {
  return `Доступные команды:
      ${colors.grey(TASK_LIST.HELP_TASK)}    — ${colors.green(DESCRIPTION)};
      ${colors.grey(TASK_LIST.VERSION_TASK)} — ${colors.green(version)};
      ${colors.grey(TASK_LIST.AUTHOR_TASK)} — ${colors.green(author)};
      ${colors.grey(TASK_LIST.LICENSE_TASK)} — ${colors.green(license)};
      ${colors.grey(TASK_LIST.DESCRIPTION_TASK)} — ${colors.green(description)};`;
};

class HelpTask extends BaseTask {
  constructor() {
    super(TASK_LIST.HELP_TASK, DESCRIPTION, showMessage(new VersionTask().description, new AuthorTask().description, new LicenseTask().description, new DescriptionTask().description));
  }
}

module.exports = HelpTask;

