'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const {generateEntity} = require(`../src/generate-entity`);
const offerStoreMock = require(`./mock/offer-store-mock`);
const imageStoreMock = require(`./mock/image-store-mock`);
const getHotelRouterMock = require(`../src/hotels/hotel-router`);
const OfferStoreMock = require(`./mock/offer-store-mock`);
const getExpressInstanceMock = require(`../src/create-server`);

const HOTELS_COUNT = 20;
const RANDOM_DATE = 12345;
const ONE_HOTEL = generateEntity();
const ALL_ERRORS = [{error: `Validation error`,
  fieldName: `title`,
  errorMessage: `Field title is required and should be from 1 to 140!`},
{error: `Validation error`,
  fieldName: `hotel`,
  errorMessage: `Field hotel is required!`},
{error: `Validation error`,
  fieldName: `price`,
  errorMessage: `Field price is required and should be from 1 to 100000!`},
{error: `Validation error`,
  fieldName: `address`,
  errorMessage: `Field address is required and should be from 0 to 100!`},
{error: `Validation error`,
  fieldName: `checkin`,
  errorMessage: `Field checkin is required!`},
{error: `Validation error`,
  fieldName: `checkout`,
  errorMessage: `Field checkout is required!`},
{error: `Validation error`,
  fieldName: `rooms`,
  errorMessage: `Field rooms is required and should be from 0 to 1000!`},
{error: `Validation error`,
  fieldName: `features`,
  errorMessage: `Field features should belong to initial values!`},
{error: `Validation error`,
  fieldName: `name`,
  errorMessage: `Field name should be text!`}
];

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

const app = getExpressInstanceMock(getHotelRouterMock(offerStoreMock, imageStoreMock));

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
    expect(`Content-Type`, /text\/html; charset=utf-8/);

    const errors = response.body;

    console.log(`response: ${errors}`);

    assert.deepEqual(errors, ALL_ERRORS);
  });

});
