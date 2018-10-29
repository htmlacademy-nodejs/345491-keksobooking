'use strict';

const Cursor = require(`./cursor-mock`);
const generateElements = require(`../../utils/generate-elements`);

const HOTELS_COUNT = 20;

class OfferStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getHotelByDate(date) {
    return this.data.find((it) => it.date === date);
  }

  async getAllHotels() {
    return new Cursor(this.data);
  }

  async save() {
    return {
      insertedId: 22
    };
  }

}

module.exports = new OfferStoreMock(generateElements(HOTELS_COUNT));
