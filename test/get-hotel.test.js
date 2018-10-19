'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const getExpressInstance = require(`../src/server-task`).getExpressInstance;
const testHotels = require(`../src/hotels/hotel-router`).hotels;

const HOTELS_COUNT = 20;
const RANDOM_DATE = 12345;

const app = getExpressInstance();

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
    return request(app).
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
    expect(`Content-Type`, /html/).
    done;
  });
});

describe(`GET /api/offers?skip=10&limit=5`, () => {

  it(`get right hotels`, async () => {

    const LIMIT_COUNT = 5;

    const response = await request(app).
    get(`/api/offers?skip=10&limit=${LIMIT_COUNT}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const hotels = response.body;
    assert.equal(hotels.length, LIMIT_COUNT);
  });

});

describe(`POST /api/offers`, () => {

  it(`send offers as json`, () => {

    return request(app).
    post(`/api/offers`).
    send(testHotels).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/).
    then((res) => {
      const hotels = res.body;
      assert.deepEqual(testHotels, hotels);
    });
  });

  it(`send hotel without title`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    send([]).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);

    const error = response.body;

    assert.deepEqual(error, [`Validation error - invalid input format`]);
  });

});
