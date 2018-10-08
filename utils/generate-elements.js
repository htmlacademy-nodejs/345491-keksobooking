'use strict';

const {generateEntity} = require(`../src/generate-entity.js`);

function generateElements(n) {
  let elements = [];

  if ((n < 1) && (typeof n !== `number`)) {
    console.log(`неправильный формат данных`);
  } else {
    for (let i = 1; i <= n; i++) {
      elements.push(generateEntity());
    }
  }

  return elements;
}

module.exports = generateElements;
