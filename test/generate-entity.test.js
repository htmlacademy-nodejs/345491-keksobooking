'use strict';
const assert = require(`assert`);
const createRandom = require(`../utils/create-random.js`);

const generateEntity = require(`../src/generate-entity.js`).generateEntity;
const {TITLES, START_PRICE, END_PRICE, TYPES, MIN_ROOM, MAX_ROOM, CHECK, FEATURES, PHOTOS, START_X, START_Y, END_X, END_Y, SEVEN_DAYS} = require(`../src/generate-entity.js`);

describe(`checking of avatar field`, function () {

  it(`is address correct?`, function () {
    assert.equal(generateEntity().author.avatar.search(/https:\/\//i), 0);
  });
});

describe(`checking of title field`, function () {

  it(`array contains element`, function () {
    assert.notEqual(TITLES.indexOf(generateEntity().offer.title), -1);
  });
});

describe(`checking of price field`, function () {

  it(`price is not out of range`, function () {
    assert.equal(((generateEntity().offer.price >= START_PRICE) && (generateEntity().offer.price <= END_PRICE)), true);
  });
  it(`huge price is out of range`, function () {
    assert.notEqual(((generateEntity().offer.price >= START_PRICE) && (generateEntity().offer.price * END_PRICE < END_PRICE)), true);
  });
});

describe(`checking of type field`, function () {

  it(`array contains element`, function () {
    assert.notEqual(TYPES.indexOf(generateEntity().offer.type), -1);
  });
});

describe(`checking of rooms field`, function () {

  it(`count of rooms is not out of range`, function () {
    assert.equal(((generateEntity().offer.rooms >= MIN_ROOM) && (generateEntity().offer.rooms <= MAX_ROOM)), true);
  });
  it(`house without rooms`, function () {
    assert.equal(((generateEntity().offer.rooms >= 0)), true);
  });
});

describe(`checking of guests field`, function () {

  it(`is type of field correct?`, function () {
    assert.equal(typeof generateEntity().offer.guests === `number`, true);
  });
});

describe(`checking of check in & out field`, function () {

  it(`array contains element`, function () {
    assert.notEqual(CHECK.indexOf(generateEntity().offer.checkin), -1);
  });

  it(`array contains element`, function () {
    assert.notEqual(CHECK.indexOf(generateEntity().offer.checkout), -1);
  });
});

describe(`checking of features field`, function () {

  it(`features are not longer than initial array`, function () {
    assert.equal(generateEntity().offer.features.length <= FEATURES.length, true);
  });

  it(`random element is from the initial array`, function () {
    assert.equal(FEATURES.indexOf(generateEntity().offer.features[0]) !== -1, true);
  });
});

describe(`checking of description field`, function () {

  it(`is type of field correct?`, function () {
    assert.equal(typeof generateEntity().offer.description === `string`, true);
  });
});

describe(`checking of photos field`, function () {

  it(`random element is from the initial array`, function () {
    assert.equal(PHOTOS.indexOf(generateEntity().offer.photos[createRandom(PHOTOS.length - 1)]) !== -1, true);
  });
});

describe(`checking of location field`, function () {

  it(`location is not out of range`, function () {
    assert.equal(((generateEntity().location.x >= START_X) && (generateEntity().location.y >= START_Y) && (generateEntity().location.x <= END_X) && (generateEntity().location.y <= END_Y)), true);
  });

  it(`location is out of range`, function () {
    assert.equal(((generateEntity().location.x >= START_X) && (generateEntity().location.y >= START_Y) && (generateEntity().location.x * END_X <= END_X) && (generateEntity().location.y * END_Y <= END_Y)), false);
  });

});

describe(`checking of date field`, function () {

  it(`you are not from future`, function () {
    assert.equal(generateEntity().date <= Date.now(), true);
  });

  it(`you are not from long past`, function () {
    assert.equal(generateEntity().date >= Date.now() - (SEVEN_DAYS * 24 * 60 * 60 * 1000), true);
  });

});
