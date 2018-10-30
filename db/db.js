'use strict';

const {MongoClient} = require(`mongodb`);
const logger = require(`../src/logger`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `keksobooking`
} = process.env;

const url = `mongodb://${DB_HOST}`;

const db = MongoClient.connect(url).then((client) => client.db(DB_PATH)).catch((e) => {
  logger.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});

module.exports = db;
