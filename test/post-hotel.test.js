'use strict';

/* const request = require(`supertest`);
const assert = require(`assert`);

const liftServer = require(`../src/server`).liftServer;
const testHotels = require(`../src/hotels/hotel-router.js`).hotels;

const app = liftServer();

describe(`POST /api/offers`, () => {
  it(`send offers as json`, async () => {

    const response = await request(app).
    post(`/api/offers`).
    send(testHotels).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);


    const hotels = response.body;
    assert.deepEqual(testHotels, hotels);
  });

});*/

