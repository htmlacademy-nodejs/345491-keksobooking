'use strict';

const {SERVER_START_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const hotelRouter = require(`./hotels/hotel-router`).hotelRouter;
const BaseTask = require(`../utils/task-constructor`);
const getExpressInstance = require(`./create-server`);

const PORT = 3098;

const MESSAGE = `Server started`;
const DESCRIPTION = `connection with server`;

class ServerTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, MESSAGE);
  }

  execute(serverPort = PORT) {
    super.execute();

    const validPort = ((typeof serverPort === `number`) && (serverPort >= 0) && (serverPort <= 65535)) ? serverPort : PORT;

    const app = getExpressInstance(hotelRouter);

    app.listen(validPort, () => console.log(`Сервер запущен: http://localhost:${validPort}`));

  }

}

module.exports = {ServerTask};
