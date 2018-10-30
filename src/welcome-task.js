'use strict';

const colors = require(`colors/safe`);
const fs = require(`fs`);
const readline = require(`readline`);
const generateElements = require(`../utils/generate-elements`);
const WELCOME_MESSAGE = colors.green(require(`../utils/task-constants`).WELCOME_MESSAGE);
const BaseTask = require(`../utils/task-constructor`);
const {POSITIVE, NEGATIVE} = require(`../utils/task-constants`).Answers;
const logger = require(`./logger`);


const currentTask = ``;
const DESCRIPTION = `welcome`;

const writeData = (count, way, exit) => {
  const homes = JSON.stringify(generateElements(count));
  fs.writeFile(`${process.cwd()}/${way}/data.json`, homes, (err) => {
    if (err) {
      logger.error(err);
    }

    exit();
  });
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

    const closeDialog = () => {
      gen.close();
    };

    const openHandler = (way, count) => {
      fs.open(`${process.cwd()}/${way}/data.json`, `wx`, (err1) => {
        if (err1) {
          if (err1.code === `EEXIST`) {

            gen.question(`файл уже существует, хочешь перезаписать? (yes/no)  `, (choice) => {
              switch (choice) {
                case POSITIVE:
                  writeData(count, way, closeDialog);
                  break;
                case NEGATIVE:
                  gen.close();
                  return;
                default:
                  console.log(`what did you say?`);
                  openHandler(way, count);
                  break;
              }
            });
            return;
          }

          logger.error(err1);
        }

        writeData(count, way, closeDialog);

      });
    };

    const startConversation = () => {
      gen.question(`Чувак, ты хочешь сгенерировать данные? (yes/no)  `, (answer) => {
        switch (answer) {
          case POSITIVE:
            gen.question(`сколько элементов надо создать?  `, (count) => {
              if (+count >= 1) {

                gen.question(`укажи имя папки для сохранения данных  `, (way) => {

                  openHandler(way, count);

                });

              } else {
                console.log(`это не число`);
                gen.close();
              }
            });
            break;
          case NEGATIVE:
            gen.close();
            return;
          default:
            console.log(`what did you say?`);
            startConversation();
            break;
        }
      });
    };

    startConversation();


    gen.on(`close`, () => {
      console.log(`end of data-creating process`);
      process.exit(0);
    }).on(`error`, () => {
      console.log(`error!`);
      process.exit(1);
    });
  }
}

module.exports = {WelcomeTask};
