'use strict';

const welcomeTask = require(`./src/welcome-screen.js`);
const versionTask = require(`./src/version.js`);
const helpTask = require(`./src/help.js`);
const authorTask = require(`./src/author.js`);
const licenseTask = require(`./src/license.js`);
const descriptionTask = require(`./src/description.js`);

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
