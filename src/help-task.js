'use strict';

const colors = require(`colors/safe`);

const Tasks = require(`./utils/task-constants`).Tasks;
const BaseTask = require(`./utils/task-constructor`);
const VersionTask = require(`./version-task`);
const AuthorTask = require(`./author-task`);
const LicenseTask = require(`./license-task`);
const DescriptionTask = require(`./description-task`);

const DESCRIPTION = `useful commands`;
const showMessage = (version, author, license, description) => {
  return `Доступные команды:
      ${colors.grey(Tasks.HELP_TASK)}    — ${colors.green(DESCRIPTION)};
      ${colors.grey(Tasks.VERSION_TASK)} — ${colors.green(version)};
      ${colors.grey(Tasks.AUTHOR_TASK)} — ${colors.green(author)};
      ${colors.grey(Tasks.LICENSE_TASK)} — ${colors.green(license)};
      ${colors.grey(Tasks.DESCRIPTION_TASK)} — ${colors.green(description)};`;
};

class HelpTask extends BaseTask {
  constructor() {
    super(Tasks.HELP_TASK, DESCRIPTION, showMessage(new VersionTask().description, new AuthorTask().description, new LicenseTask().description, new DescriptionTask().description));
  }
}

module.exports = HelpTask;

