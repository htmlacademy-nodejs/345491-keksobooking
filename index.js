const HELP_TASK = `--help`;
const VERSION_TASK = `--version`;
const WELCOME_MESSAGE = `Привет пользователь!
Эта программа будет запускать сервер «Кексобукинг».
Автор: Кекс.`;

const command = process.argv[2];

function setTask(task = WELCOME_MESSAGE) {
  let message = ``;

  switch (task) {

    case HELP_TASK:
      message = `Доступные команды:
      ${HELP_TASK}    — печатает этот текст;
      ${VERSION_TASK} — печатает версию приложения;`;
      break;
    case VERSION_TASK:
      message = `v0.0.1`;
      break;
    case WELCOME_MESSAGE:
      message = WELCOME_MESSAGE;
      break;
    default:
      message = `Неизвестная команда ${command}.
      Чтобы прочитать правила использования приложения, наберите ${HELP_TASK}`;
      console.error(message);
      process.exit(1);
  }

  console.log(message);
}

setTask(command);
