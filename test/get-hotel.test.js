'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const {generateEntity} = require(`../src/generate-entity`);
// const hotelRouterMock = require(`./mock/hotel-router-mock`).hotelRouter;
const offerStoreMock = require(`./mock/offer-store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);
const hotelRouterMock = require(`../src/hotels/hotel-router`)(offerStoreMock, imageStoreMock);
const OfferStoreMock = require(`./mock/offer-store-mock`);
const getExpressInstanceMock = require(`../src/create-server`);

const HOTELS_COUNT = 20;
const RANDOM_DATE = 12345;
const START_PRICE = 1;
const END_PRICE = 100000;
const MIN_ROOM = 0;
const MAX_ROOM = 1000;
const ONE_HOTEL = generateEntity();
const ALL_ERRORS = [`Field title is required and should be from 0 to 140 letters!`, `Field hotel is required and should be one of four types!`, `Field price is required and should be from ${START_PRICE} to ${END_PRICE} $!`, `Field address is required and should be less than 101 letters!`, `Field checkin is required!`, `Field checkout is required!`, `Field rooms is required and should be from ${MIN_ROOM} to ${MAX_ROOM}!`, `Field features should belong to initial values!`, `Field name should be text!`];

const WRONG_HOTEL = {
  "author": {
    "name": 111,
    "avatar": ``
  },

  "offer": {
    "title": 111,
    "address": 111,
    "price": `aaa`,
    "type": 111,
    "rooms": `aaa`,
    "guests": `aaa`,
    "checkin": `aaa`,
    "checkout": `aaa`,
    "features": `aaa`,
    "description": 111,
    "photos": `aaa`,
    "preview": ``
  },

  "location": {
    "x": `aaa`,
    "y": `aaa`
  },
  "date": `aaa`
};

const app = getExpressInstanceMock(hotelRouterMock);

describe(`GET /api/offers`, () => {

  it(`get all hotels`, async () => {

    const response = await request(app).
    get(`/api/offers`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const hotels = response.body;

    assert.equal(hotels.total, HOTELS_COUNT);

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
    get(`/api/offers/${OfferStoreMock.data[0].date}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const hotel = response.body;
    assert.strictEqual(hotel.date, OfferStoreMock.data[0].date);

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
    get(`/api/offers?skip=10&limit=${LIMIT_COUNT}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const hotels = response.body;

    assert.equal(hotels.data.length, LIMIT_COUNT);
  });

});

describe(`POST /api/offers`, () => {

  it(`send offers as json`, () => {

    return request(app).
    post(`/api/offers`).
    send(ONE_HOTEL).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/).
    then((res) => {
      const hotels = res.body;

      assert.deepEqual(ONE_HOTEL, hotels);
    });
  });

  it(`send wrong hotel`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    send(WRONG_HOTEL).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);

    const errors = response.body;

    assert.deepEqual(errors, ALL_ERRORS);
  });

});
