'use strict';

const logger = require(`../logger`);


const {generateEntity} = require(`../generate-entity`);

function generateElements(n) {
  let elements = [];

  if ((n < 1) && (typeof n !== `number`)) {
    logger.info(`неправильный формат данных`);
  } else {
    for (let i = 1; i <= n; i++) {
      elements.push(generateEntity());
    }
  }

  return elements;
}

module.exports = generateElements;
