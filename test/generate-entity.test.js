'use strict';
const assert = require(`assert`);
const createRandom = require(`../utils/create-random.js`);

const {generateEntity, TITLES, START_PRICE, END_PRICE, TYPES, MIN_ROOM, MAX_ROOM, CHECK, FEATURES, PHOTOS, START_X, START_Y, END_X, END_Y, SEVEN_DAYS, MAX_GUESTS} = require(`../src/generate-entity.js`);

describe(`testing of generateEntity`, function () {

  const testingEntity = generateEntity();

  describe(`checking of avatar field`, function () {

    it(`has correct address`, function () {
      assert.equal(generateEntity().author.avatar.search(/https:\/\//i), 0);
    });
  });

  describe(`checking of title field`, function () {

    it(`contains right element`, function () {
      assert.notEqual(TITLES.indexOf(generateEntity().offer.title), -1);
    });
  });

  describe(`checking of price field`, function () {

    it(`has price which is not out of range`, function () {
      assert.equal(((generateEntity().offer.price >= START_PRICE) && (generateEntity().offer.price <= END_PRICE)), true);
    });
    it(`has price which is out of range`, function () {
      assert.notEqual(((generateEntity().offer.price >= START_PRICE) && (generateEntity().offer.price * END_PRICE < END_PRICE)), true);
    });
  });

  describe(`checking of type field`, function () {

    it(`contains right element`, function () {
      assert.notEqual(TYPES.indexOf(generateEntity().offer.type), -1);
    });
  });

  describe(`checking of rooms field`, function () {

    it(`has right count of rooms`, function () {
      assert.equal(((generateEntity().offer.rooms >= MIN_ROOM) && (generateEntity().offer.rooms <= MAX_ROOM)), true);
    });
    it(`has correct type`, function () {
      assert.equal(typeof generateEntity().offer.rooms, `number`);
    });
  });

  describe(`checking of guests field`, function () {

    it(`has correct type`, function () {
      assert.equal(typeof generateEntity().offer.guests === `number`, true);
    });

    it(`has correct type`, function () {
      assert.equal((generateEntity().offer.guests <= MAX_GUESTS && generateEntity().offer.guests >= 0), true);
    });
  });

  describe(`checking of check in & out field`, function () {

    it(`contains right element`, function () {
      assert.notEqual(CHECK.indexOf(generateEntity().offer.checkin), -1);
    });

    it(`contains right element`, function () {
      assert.notEqual(CHECK.indexOf(generateEntity().offer.checkout), -1);
    });
  });

  describe(`checking of features field`, function () {

    it(`has not alien elements`, function () {
      let alien = 0;
      for (let i = 0; i < testingEntity.offer.features.length; i++) {
        alien = (FEATURES.indexOf(testingEntity.offer.features[i]) !== -1) ? alien : alien++;
      }
      assert.equal(alien, 0);
    });

    it(`has not repeating elements`, function () {
      let repeat = 0;
      for (let i = 0; i < testingEntity.offer.features.length; i++) {
        repeat = (testingEntity.offer.features.indexOf(testingEntity.offer.features[i]) === (testingEntity.offer.features.length - testingEntity.offer.features.lastIndexOf(testingEntity.offer.features[i]))) ? repeat : repeat++;
      }
      assert.equal(repeat, 0);
    });

    it(`has random element from the initial array`, function () {
      assert.equal(FEATURES.indexOf(generateEntity().offer.features[0]) !== -1, true);
    });
  });

  describe(`checking of description field`, function () {

    it(`has correct type`, function () {
      assert.equal(typeof generateEntity().offer.description === `string`, true);
    });
  });

  describe(`checking of photos field`, function () {

    it(`has random element from the initial array`, function () {
      assert.equal(PHOTOS.indexOf(generateEntity().offer.photos[createRandom(PHOTOS.length - 1)]) !== -1, true);
    });
  });

  describe(`checking of location field`, function () {

    it(`has location which in range`, function () {
      assert.equal(((generateEntity().location.x >= START_X) && (generateEntity().location.y >= START_Y) && (generateEntity().location.x <= END_X) && (generateEntity().location.y <= END_Y)), true);
    });

    it(`has location which out of range`, function () {
      assert.equal(((generateEntity().location.x * END_X <= END_X) && (generateEntity().location.y * END_Y <= END_Y)), false);
    });

  });

  describe(`checking of date field`, function () {

    it(`shows that you are not from future or past`, function () {
      assert.equal((generateEntity().date <= Date.now()) && (generateEntity().date >= Date.now() - (SEVEN_DAYS * 24 * 60 * 60 * 1000)), true);
    });

  });
});
