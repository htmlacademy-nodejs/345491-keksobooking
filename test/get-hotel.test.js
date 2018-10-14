'use strict';

const request = require(`supertest`);
const assert = require(`assert`);
const app = require(`../src/server`).app;
const ServerStartTask = require(`../src/server`).ServerStartTask;
const testHotels = require(`../src/hotels/hotel-router.js`).hotels;

const HOTELS_COUNT = 20;
const RANDOM_DATE = 12345;

new ServerStartTask().execute();

describe(`GET /api/offers`, () => {
  it(`get all hotels`, async () => {

    const response = await request(app).
    get(`/api/offers`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const hotels = response.body;
    assert.equal(hotels.length, HOTELS_COUNT);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app).
    get(`/api/coffee`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Page was not found`).
    expect(`Content-Type`, /html/);
  });

});

describe(`GET /api/offers/:date`, () => {
  it(`get first hotel date"`, async () => {
    const response = await request(app).
    get(`/api/offers/${testHotels[0].date}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const hotel = response.body;
    assert.strictEqual(hotel.date, testHotels[0].date);
  });

  it(`get unknown date"`, async () => {
    return request(app).
    get(`/api/offers/${RANDOM_DATE}`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Предложение не найдено.`).
    expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/offers?skip=10&limit=5`, () => {
  it(`get right hotels`, async () => {

    const LIMIT_COUNT = 5;

    const response = await request(app).
    get(`/api/offers?skip=10&limit=5`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const hotels = response.body;
    assert.equal(hotels.length, LIMIT_COUNT);
  });

});
