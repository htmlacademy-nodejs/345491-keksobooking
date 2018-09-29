'use strict';

const TASK_LIST = require(`./utils/task-constants`);
const versionTask = require(`./src/version.js`);
const helpTask = require(`./src/help.js`);
const authorTask = require(`./src/author.js`);
const licenseTask = require(`./src/license.js`);
const descriptionTask = require(`./src/description.js`);

const command = process.argv[2];

function setTask(task = WELCOME_MESSAGE) {

  switch (task) {

    case helpTask.name:
      helpTask.execute();
      break;
    case versionTask.name:
      versionTask.execute();
      break;
    case authorTask.name:
      authorTask.execute();
      break;
    case licenseTask.name:
      licenseTask.execute();
      break;
    case descriptionTask.name:
      descriptionTask.execute();
      break;
    case TASK_LIST.WELCOME_MESSAGE:
      console.log(TASK_LIST.WELCOME_MESSAGE);
      break;
    default:
      console.error(`Неизвестная команда ${command}.
      Доступные команды:
        ${helpTask.name}    — вызов справки;
        ${versionTask.name} — текущая версия;
        ${authorTask.name} — сведения об авторе;
        ${licenseTask.name} — сведения о лицензии;
        ${descriptionTask.name} — описание приложения;`);
      process.exit(1);
  }
}

setTask(command);
