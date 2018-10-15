'use strict';

const WelcomeTask = require(`./src/welcome-task`).WelcomeTask;
const VersionTask = require(`./src/version-task`);
const HelpTask = require(`./src/help-task`);
const AuthorTask = require(`./src/author-task`);
const LicenseTask = require(`./src/license-task`);
const DescriptionTask = require(`./src/description-task`);
const ServerTask = require(`./src/server-task`).ServerTask;

const command = process.argv[2];
const port = parseInt(process.argv[3], 10);

function setTask(task = new WelcomeTask().name) {
  let currentTask = {};

  switch (task) {

    case new HelpTask().name:
      currentTask = new HelpTask();
      break;
    case new VersionTask().name:
      currentTask = new VersionTask();
      break;
    case new AuthorTask().name:
      currentTask = new AuthorTask();
      break;
    case new LicenseTask().name:
      currentTask = new LicenseTask();
      break;
    case new DescriptionTask().name:
      currentTask = new DescriptionTask();
      break;
    case new WelcomeTask().name:
      currentTask = new WelcomeTask();
      break;
    case new ServerTask().name:
      currentTask = new ServerTask();
      break;
    default:
      console.error(`Неизвестная команда ${command}.
      Доступные команды:
        ${new HelpTask().name}    — ${new HelpTask().description};
        ${new VersionTask().name} — ${new VersionTask().description};
        ${new AuthorTask().name} — ${new AuthorTask().description};
        ${new LicenseTask().name} — ${new LicenseTask().description};
        ${new DescriptionTask().name} — ${new DescriptionTask().description};`);
      process.exit(1);
  }

  currentTask.execute(port);
}

setTask(command);
