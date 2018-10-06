'use strict';

const WELCOME_MESSAGE = `Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Кекс.`;

const Tasks = {
  HELP_TASK: `--help`,
  VERSION_TASK: `--version`,
  AUTHOR_TASK: `--author`,
  LICENSE_TASK: `--license`,
  DESCRIPTION_TASK: `--description`
};

const Answers = {
  POSITIVE: `yes`,
  NEGATIVE: `no`
};

module.exports = {Tasks, Answers, WELCOME_MESSAGE};
