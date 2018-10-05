'use strict';

const colors = require(`colors/safe`);

// const gen = require(`./generation-cli.js`);
const WELCOME_MESSAGE = colors.green(require(`../utils/task-constants`).WELCOME_MESSAGE);
const currentTask = ``;
const BaseTask = require(`../utils/task-constructor`);
const DESCRIPTION = `welcome`;

const readline = require(`readline`);
const generateElements = require(`../utils/generate-elements.js`);

class WelcomeTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, WELCOME_MESSAGE);
  }

  execute() {
    super.execute();
    console.log(`Чувак, ты хочешь сгенерировать данные? (yes/no)`);

    const gen = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `data-creating process>`
    });

    gen.on(`line`, (line) => {
      line = line.trim();

      switch (line) {

        case `yes`:
          console.log(`создание одного элемента`);
          console.log(JSON.stringify(generateElements(1)));
          break;
        case `no`:
          gen.close();
          return;
        default:
          console.log(`what did you say?`);
          break;
      }

      gen.prompt();
    }).on(`close`, () => {
      console.log(`abort of data-creating process`);
      process.exit(0);
    }).on(`error`, () => {
      console.log(`error!`);
      process.exit(1);
    });
  }
}

module.exports = WelcomeTask;
