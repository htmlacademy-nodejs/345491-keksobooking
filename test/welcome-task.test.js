'use strict';

const assert = require(`assert`);
const writeData = require(`../src/welcome-task.js`).writeData;
const fs = require(`fs`);

const TEST_WAY = `test`;
const TEST_COUNT = 5;
const TEST_COUNT2 = 2;
const isCreated = () => console.log(`created`);
let existence = false;


describe(`testing of generated file`, function () {

  before(`generate test file`, function () {
    writeData(TEST_COUNT, TEST_WAY, isCreated);
  });

  it(`contains rigth data`, function () {
    let arrLength = 0;

    fs.readFile(`${process.cwd()}/${TEST_WAY}/data.json`, `utf8`, (err, data) => {
      if (err) {
        console.error(err);
      }

      arrLength = +JSON.parse(data).length;

      assert.equal(arrLength, TEST_COUNT);
    });

  });


  it(`creates the file`, function () {
    const testFunc = () => {
      existence = true;
    };

    fs.open(`${process.cwd()}/${TEST_WAY}/data.json`, `r`, (err) => {
      if (err) {
        if (err.code === `ENOENT`) {
          console.error(`my file does not exist`);
          return;
        }

        console.error(err);
      }

      testFunc();
      assert.equal(existence, true);

    });


  });

  it(`rewrites the file`, function () {
    let arrLength = 0;

    fs.open(`${process.cwd()}/${TEST_WAY}/data.json`, `wx`, (err) => {
      if (err) {
        if (err.code === `ENOENT`) {
          console.error(`my file does not exist`);
          return;
        }

        if (err.code === `EEXIST`) {
          writeData(TEST_COUNT2, TEST_WAY, isCreated);
        }

        console.error(err);
      }

    });

    fs.readFile(`${process.cwd()}/${TEST_WAY}/data.json`, `utf8`, (err, data) => {
      if (err) {
        console.error(err);
      }

      arrLength = +JSON.parse(data).length;

      assert.equal(arrLength, TEST_COUNT2);
    });


  });

});