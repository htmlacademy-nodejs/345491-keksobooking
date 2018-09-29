const {HELP_TASK: currentTask, ...OTHER_TASKS} = require(`../utils/task-constants`);
const ParentTask = require(`../utils/task-constructor`);

const DESCRIPTION = `useful commands`;
const MESSAGE = `Доступные команды:
      ${currentTask}    — печатает этот текст;
      ${OTHER_TASKS.VERSION_TASK} — текущая версия;
      ${OTHER_TASKS.AUTHOR_TASK} — сведения об авторе;
      ${OTHER_TASKS.LICENSE_TASK} — сведения о лицензии;
      ${OTHER_TASKS.DESCRIPTION_TASK} — описание приложения;`;

const helpTask = new ParentTask(currentTask, DESCRIPTION, MESSAGE);

module.exports = helpTask;

