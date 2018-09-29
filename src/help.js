'use strict';

const TASK_LIST = require(`../utils/task-constants`);
const ParentTask = require(`../utils/task-constructor`);

const DESCRIPTION = `useful commands`;
const MESSAGE = `Доступные команды:
      ${TASK_LIST.HELP_TASK}    — печатает этот текст;
      ${TASK_LIST.VERSION_TASK} — текущая версия;
      ${TASK_LIST.AUTHOR_TASK} — сведения об авторе;
      ${TASK_LIST.LICENSE_TASK} — сведения о лицензии;
      ${TASK_LIST.DESCRIPTION_TASK} — описание приложения;`;

const helpTask = new ParentTask(TASK_LIST.HELP_TASK, DESCRIPTION, MESSAGE);

module.exports = helpTask;

