'use strict';

const {ValidationError, CommonValidationError} = require(`../utils/errors`);

const {START_PRICE, END_PRICE, TYPES, MIN_ROOM, MAX_ROOM, CHECK, FEATURES} = require(`../generate-entity`);

const ADRESS_LIMIT = 100;
const LOW_LIMIT = 1;
const UP_LIMIT = 140;
const STRING = `string`;
const NUMBER = `number`;
const Fields = {
  title: `title`,
  hotel: `hotel`,
  price: `price`,
  address: `address`,
  checkin: `checkin`,
  checkout: `checkout`,
  rooms: `rooms`
};


function validateHotel(hotel) {
  const errors1 = [];

  function checkInOut(check, name, arr) {
    if ((!check) || (typeof check !== STRING) || (arr.indexOf(check) === -1)) {
      errors1.push(new ValidationError(`Validation error`, name, `Field ${name} is required!`).info);
    }
  }

  function checkMinMax(check, name, type, low = 0, high) {
    if ((!check) || (typeof check !== type) || (check.length < low) || (check.length > high)) {
      errors1.push(new ValidationError(`Validation error`, name, `Field ${name} is required and should be from ${low} to ${high}!`).info);
    }
  }

  if ((!hotel.offer) || (!hotel.author)) {
    errors1.push(`Validation error - invalid input format`);
    throw new ValidationError(`Validation error`, errors1);
  }

  checkMinMax(hotel.offer.title, Fields.title, STRING, LOW_LIMIT, UP_LIMIT);

  checkInOut(hotel.offer.type, Fields.hotel, TYPES);

  checkMinMax(hotel.offer.price, Fields.price, NUMBER, START_PRICE, END_PRICE);

  checkMinMax(hotel.offer.address, Fields.address, STRING, 0, ADRESS_LIMIT);

  checkInOut(hotel.offer.checkin, Fields.checkin, CHECK);

  checkInOut(hotel.offer.checkout, Fields.checkout, CHECK);

  checkMinMax(hotel.offer.rooms, Fields.rooms, NUMBER, MIN_ROOM, MAX_ROOM);


  if ((!Array.isArray(hotel.offer.features)) || !(hotel.offer.features.every((it) => FEATURES.indexOf(it) !== -1)) || !(hotel.offer.features.every((it, ind, arr) => arr.indexOf(it) === ind))) {
    errors1.push(new ValidationError(`Validation error`, `features`, `Field features should belong to initial values!`).info);

  }

  if (typeof hotel.author.name !== STRING) {
    errors1.push(new ValidationError(`Validation error`, `name`, `Field name should be text!`).info);
  }

  if (errors1.length > 0) {

    throw new CommonValidationError(errors1);
  }

  return hotel;
}

module.exports = validateHotel;
