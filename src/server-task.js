'use strict';

const express = require(`express`);
const {SERVER_START_TASK: currentTask} = require(`../utils/task-constants`).Tasks;
const hotelRouter = require(`./hotels/hotel-router.js`).hotelRouter;
const BaseTask = require(`../utils/task-constructor`);

const PORT = 3098;

const MESSAGE = `Server started`;
const DESCRIPTION = `connection with server`;

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(err.message);
  }
};

function getExpressInstance() {

  const app = express();

  app.use(express.static(`${__dirname}/../static`));

  app.use(`/api/offers`, hotelRouter);

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

    const app = getExpressInstance();

    app.listen(validPort, () => console.log(`Сервер запущен: http://localhost:${validPort}`));

  }

}

module.exports = {getExpressInstance, ServerTask};
