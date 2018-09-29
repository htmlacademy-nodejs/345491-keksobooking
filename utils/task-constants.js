'use strict';

const colors = require(`colors/safe`);

const WELCOME_MESSAGE = `Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Кекс.`;

const Tasks = {
  HELP_TASK: colors.cyan(`--help`),
  VERSION_TASK: colors.green(`--version`),
  AUTHOR_TASK: colors.grey(`--author`),
  LICENSE_TASK: colors.rainbow(`--license`),
  DESCRIPTION_TASK: colors.blue(`--description`)
};

module.exports = {Tasks, WELCOME_MESSAGE};
