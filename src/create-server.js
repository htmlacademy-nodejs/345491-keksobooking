'use strict';

const express = require(`express`);
const MongoError = require(`mongodb`).MongoError;
const ValidationError = require(`../utils/errors`).ValidationError;

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

module.exports = getExpressInstance;
