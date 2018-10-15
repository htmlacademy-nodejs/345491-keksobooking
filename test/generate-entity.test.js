'use strict';

const assert = require(`assert`);
const createRandom = require(`../utils/create-random.js`);

const {generateEntity, TITLES, START_PRICE, END_PRICE, TYPES, MIN_ROOM, MAX_ROOM, CHECK, FEATURES, PHOTOS, START_X, START_Y, END_X, END_Y, SEVEN_DAYS, MAX_GUESTS} = require(`../src/generate-entity.js`);

describe(`testing of generateEntity`, function () {

  const testingEntity = generateEntity();

  describe(`checking of avatar field`, function () {

    it(`has correct address`, function () {
      assert.equal(testingEntity.author.avatar.search(/https:\/\//i), 0);
    });
  });

  describe(`checking of title field`, function () {

    it(`contains right element`, function () {
      assert.notEqual(TITLES.indexOf(testingEntity.offer.title), -1);
    });
  });

  describe(`checking of price field`, function () {

    it(`has price which is not out of range`, function () {
      assert.equal(((testingEntity.offer.price >= START_PRICE) && (testingEntity.offer.price <= END_PRICE)), true);
    });
  });

  describe(`checking of type field`, function () {

    it(`contains right element`, function () {
      assert.notEqual(TYPES.indexOf(testingEntity.offer.type), -1);
    });
  });

  describe(`checking of rooms field`, function () {

    it(`has right count of rooms`, function () {
      assert.equal(((testingEntity.offer.rooms >= MIN_ROOM) && (testingEntity.offer.rooms <= MAX_ROOM)), true);
    });
    it(`has correct type`, function () {
      assert.equal(typeof testingEntity.offer.rooms, `number`);
    });
  });

  describe(`checking of guests field`, function () {

    it(`has correct type`, function () {
      assert.equal(typeof testingEntity.offer.guests === `number`, true);
    });

    it(`has correct type`, function () {
      assert.equal((testingEntity.offer.guests <= MAX_GUESTS && testingEntity.offer.guests >= 0), true);
    });
  });

  describe(`checking of check in & out field`, function () {

    it(`contains right element`, function () {
      assert.notEqual(CHECK.indexOf(testingEntity.offer.checkin), -1);
    });

    it(`contains right element`, function () {
      assert.notEqual(CHECK.indexOf(testingEntity.offer.checkout), -1);
    });
  });

  describe(`checking of features field`, function () {

    it(`has not alien elements`, function () {
      const isThere = (it) => FEATURES.indexOf(it) !== -1;
      assert.equal(testingEntity.offer.features.every(isThere), true);
    });

    it(`has not repeating elements`, function () {
      const isOne = (it, ind, arr) => arr.indexOf(it) === ind;

      assert.equal(testingEntity.offer.features.every(isOne), true);
    });

    it(`has random element from the initial array`, function () {
      assert.equal(FEATURES.indexOf(testingEntity.offer.features[0]) !== -1, true);
    });
  });

  describe(`checking of description field`, function () {

    it(`has correct type`, function () {
      assert.equal(typeof testingEntity.offer.description === `string`, true);
    });
  });

  describe(`checking of photos field`, function () {

    it(`has random element from the initial array`, function () {
      assert.equal(PHOTOS.indexOf(testingEntity.offer.photos[createRandom(PHOTOS.length - 1)]) !== -1, true);
    });
  });

  describe(`checking of location field`, function () {

    it(`has location which in range`, function () {
      assert.equal(((testingEntity.location.x >= START_X) && (testingEntity.location.y >= START_Y) && (testingEntity.location.x <= END_X) && (testingEntity.location.y <= END_Y)), true);
    });

  });

  describe(`checking of date field`, function () {

    it(`shows that you are not from future or past`, function () {
      assert.equal((testingEntity.date <= Date.now()) && (testingEntity.date >= Date.now() - (SEVEN_DAYS * 24 * 60 * 60 * 1000)), true);
    });

  });
});
