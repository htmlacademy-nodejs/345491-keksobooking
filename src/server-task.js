'use strict';

const {SERVER_START_TASK: currentTask} = require(`./utils/task-constants`).Tasks;
const offerStore = require(`./db/offer-store`);
const imageStore = require(`./db/image-store`);
const getHotelRouter = require(`./hotels/hotel-router`);
const BaseTask = require(`./utils/task-constructor`);
const getExpressInstance = require(`./create-server`);
const logger = require(`./logger`);

const {
  SERVER_PORT = 3333,
  SERVER_HOST = `localhost`
} = process.env;

const MESSAGE = `Server started`;
const DESCRIPTION = `connection with server`;

class ServerTask extends BaseTask {
  constructor() {
    super(currentTask, DESCRIPTION, MESSAGE);
  }

  execute(serverPort = SERVER_PORT) {
    super.execute();

    const validPort = ((typeof serverPort === `number`) && (serverPort >= 0) && (serverPort <= 65535)) ? serverPort : SERVER_PORT;

    const app = getExpressInstance(getHotelRouter(offerStore, imageStore));

    app.listen(validPort, () => logger.info(`Сервер запущен: http://${SERVER_HOST}:${validPort}`));

  }

}

module.exports = {ServerTask};
