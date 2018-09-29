'use strict';

const welcomeTask = require(`./src/welcome-task`);
const versionTask = require(`./src/version-task.js`);
const helpTask = require(`./src/help-task`);
const authorTask = require(`./src/author-task`);
const licenseTask = require(`./src/license-task`);
const descriptionTask = require(`./src/description-task`);

const command = process.argv[2];

function setTask(task = welcomeTask.name) {
  let currentTask = {};

  switch (task) {

    case helpTask.name:
      currentTask = helpTask;
      break;
    case versionTask.name:
      currentTask = versionTask;
      break;
    case authorTask.name:
      currentTask = authorTask;
      break;
    case licenseTask.name:
      currentTask = licenseTask;
      break;
    case descriptionTask.name:
      currentTask = descriptionTask;
      break;
    case welcomeTask.name:
      currentTask = welcomeTask;
      break;
    default:
      console.error(`Неизвестная команда ${command}.
      Доступные команды:
        ${helpTask.name}    — ${helpTask.description};
        ${versionTask.name} — ${versionTask.description};
        ${authorTask.name} — ${authorTask.description};
        ${licenseTask.name} — ${licenseTask.description};
        ${descriptionTask.name} — ${descriptionTask.description};`);
      process.exit(1);
  }

  currentTask.execute();
}

setTask(command);
