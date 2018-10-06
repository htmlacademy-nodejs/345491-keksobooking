'use strict';

const colors = require(`colors/safe`);
const fs = require(`fs`);

const WELCOME_MESSAGE = colors.green(require(`../utils/task-constants`).WELCOME_MESSAGE);
const currentTask = ``;
const BaseTask = require(`../utils/task-constructor`);
const DESCRIPTION = `welcome`;

const readline = require(`readline`);
const generateElements = require(`../utils/generate-elements.js`);
let homes = [];

const errHandler = (err) => {
  if (err) {
    console.error(err);
  }
};


class WelcomeTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, WELCOME_MESSAGE);
  }

  execute() {
    super.execute();

    const gen = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const openHandler = (way) => {
      fs.open(`${process.cwd()}/${way}/data.json`, `wx`, (err1) => {
        if (err1) {
          if (err1.code === `EEXIST`) {

            gen.question(`файл уже существует, хочешь перезаписать? (yes/no)  `, (choice) => {
              switch (choice) {
                case `yes`:
                  fs.writeFile(`${process.cwd()}/${way}/data.json`, homes, errHandler);

                  // setImmediate(() => gen.close());

                  break;
                case `no`:
                  gen.close();
                  return;
                default:
                  console.log(`what did you say?`);
                  break;
              }
            });
            return;
          }

          console.error(err1);
        }

        fs.writeFile(`${process.cwd()}/${way}/data.json`, homes, errHandler);

      });
    };

    gen.question(`Чувак, ты хочешь сгенерировать данные? (yes/no)  `, (answer) => {
      switch (answer) {
        case `yes`:
          gen.question(`сколько элементов надо создать?  `, (count) => {
            if (count >= 1) {

              homes = JSON.stringify(generateElements(count));
              // console.log(homes);

              gen.question(`укажи имя папки для сохранения данных  `, (way) => {

                openHandler(way);

              });

            } else {
              console.log(`это не число`);
              gen.close();
            }
          });
          break;
        case `no`:
          gen.close();
          return;
        default:
          console.log(`what did you say?`);
          break;
      }
    });

    gen.on(`close`, () => {
      console.log(`end of data-creating process`);
      process.exit(0);
    }).on(`error`, () => {
      console.log(`error!`);
      process.exit(1);
    });
  }
}

module.exports = WelcomeTask;
