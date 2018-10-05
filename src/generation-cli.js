'use strict';

const readline = require(`readline`);
const generateElements = require(`../utils/generate-elements.js`);

const gen = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `data-creating process>`
});

gen.on(`line`, (line) => {
  line = line.trim();

  switch (line) {

    case `yes`:
      console.log(`сколько элементов хочешь создать?`);
      console.log(JSON.stringify(generateElements(1)));
      break;
    case `no`:
      gen.close();
      return;
    default:
      console.log(`what did you say?`);
      break;
  }

  gen.prompt();
}).on(`close`, () => {
  console.log(`abort of data-creating process`);
  process.exit(0);
}).on(`error`, () => {
  console.log(`error!`);
  process.exit(1);
});

