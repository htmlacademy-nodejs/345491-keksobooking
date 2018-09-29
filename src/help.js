const {HELP_TASK: currentTask, ...OTHER_TASKS} = require(`../utils/task-constants`);

module.exports = {
  name: currentTask,
  description: `useful commands`,
  execute() {
    console.log(`Доступные команды:
      ${this.name}    — печатает этот текст;
      ${OTHER_TASKS.VERSION_TASK} — текущая версия;
      ${OTHER_TASKS.AUTHOR_TASK} — сведения об авторе;
      ${OTHER_TASKS.LICENSE_TASK} — сведения о лицензии;
      ${OTHER_TASKS.DESCRIPTION_TASK} — описание приложения;`);
  }
};
