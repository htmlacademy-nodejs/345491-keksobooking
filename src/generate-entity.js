'use strict';
const createRandom = require(`../utils/create-random`);

const TITLES = [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`];
const TYPES = [`flat`, `palace`, `house`, `bungalo`];
const CHECK = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const START_PRICE = 1;
const END_PRICE = 100000;
const MIN_ROOM = 0;
const MAX_ROOM = 1000;
const MAX_GUESTS = 100;
const START_X = 300;
const START_Y = 150;
const END_X = 900;
const END_Y = 500;
const SEVEN_DAYS = 7;
const NAMES = [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`];

function generateEntity() {

  const locations = {
    x: START_X + createRandom(END_X - START_X),
    y: START_Y + createRandom(END_Y - START_Y)
  };

  return {
    "author": {
      "name": NAMES[createRandom(NAMES.length - 1)],
      "avatar": `https://robohash.org/bender`
    },

    "offer": {
      "title": TITLES[createRandom(TITLES.length - 1)],
      "address": `${locations.x}, ${locations.y}`,
      "price": START_PRICE + createRandom(END_PRICE - START_PRICE),
      "type": TYPES[createRandom(TYPES.length - 1)],
      "rooms": MIN_ROOM + createRandom(MAX_ROOM - MIN_ROOM),
      "guests": createRandom(MAX_GUESTS),
      "checkin": CHECK[createRandom(CHECK.length - 1)],
      "checkout": CHECK[createRandom(CHECK.length - 1)],
      "features": FEATURES.filter((it, ind) => {
        const rand = createRandom(END_PRICE);
        return rand % ind === 0;
      }),
      "description": ``,
      "photos": PHOTOS.sort((a, b) => createRandom(a.length) - createRandom(b.length)),
      "preview": `${__dirname}/../static/img/avatars/user01.png`
    },

    "location": {
      "x": locations.x,
      "y": locations.y
    },
    "date": Date.now() - createRandom(SEVEN_DAYS * 24 * 60 * 60 * 1000)
  };
}

module.exports = {generateEntity, TITLES, START_PRICE, END_PRICE, TYPES, MIN_ROOM, MAX_ROOM, CHECK, FEATURES, PHOTOS, START_X, START_Y, END_X, END_Y, SEVEN_DAYS, MAX_GUESTS};
