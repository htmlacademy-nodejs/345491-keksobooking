'use strict';

require(`dotenv`).config();

const WelcomeTask = require(`./welcome-task`).WelcomeTask;
const VersionTask = require(`./version-task`);
const HelpTask = require(`./help-task`);
const AuthorTask = require(`./author-task`);
const LicenseTask = require(`./license-task`);
const DescriptionTask = require(`./description-task`);
const ServerTask = require(`./server-task`).ServerTask;

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
