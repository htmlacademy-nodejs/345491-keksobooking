'use strict';

const express = require(`express`);
const {SERVER_START_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const hotelRouter = require(`./hotels/hotel-router`).hotelRouter;
const BaseTask = require(`../utils/task-constructor`);
const MongoError = require(`mongodb`).MongoError;
const ValidationError = require(`../utils/errors`).ValidationError;

const PORT = 3098;

const MESSAGE = `Server started`;
const DESCRIPTION = `connection with server`;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    if (err instanceof ValidationError) {
      res.status(err.code).json(err.errors);
      return;
    } else if (err instanceof MongoError) {
      res.status(400).json(err.message);
      return;
    }
    res.status(err.code || 500).send(err.message);
  }
};

function getExpressInstance(inst) {

  const app = express();

  app.use(express.static(`${__dirname}/../static`));

  app.use(`/api/offers`, inst);

  app.use(NOT_FOUND_HANDLER);

  app.use(ERROR_HANDLER);

  return app;
}

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

module.exports = {getExpressInstance, ServerTask};
