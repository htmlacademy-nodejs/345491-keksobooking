'use strict';

const db = require(`./db`);

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`hotels`);
  collection.createIndex({name: -1}, {unique: true});
  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getHotelByDate(date) {
    return (await this.collection).findOne({date});
  }

  async getAllHotels() {
    return (await this.collection).find();
  }

  async save(hotelData) {
    return (await this.collection).insertOne(hotelData);
  }

}

module.exports = new OfferStore(setupCollection().
catch((e) => console.error(`Failed to set up collection`, e)));
