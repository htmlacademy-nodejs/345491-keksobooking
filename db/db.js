'use strict';

const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

const db = MongoClient.connect(url).then((client) => client.db(`keksobooking`)).catch((e) => {
  console.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});

module.exports = db;
