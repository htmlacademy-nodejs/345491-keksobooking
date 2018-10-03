'use strict';

function createRandom(end = 0) {
  return Math.round(Math.random() * (end));
}

module.exports = createRandom;
