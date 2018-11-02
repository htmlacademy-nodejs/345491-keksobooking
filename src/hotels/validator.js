'use strict';

const ValidationError = require(`../utils/errors`).ValidationError;

const {START_PRICE, END_PRICE, TYPES, MIN_ROOM, MAX_ROOM, CHECK, FEATURES} = require(`../generate-entity`);

const ADRESS_LIMIT = 100;
const CODE_400 = 400;
const LOW_LIMIT = 1;
const UP_LIMIT = 140;

function validateHotel(hotel) {
  const fieldName = [];
  const errors = [];

  if ((!hotel.offer) || (!hotel.author)) {
    errors.push(`Validation error - invalid input format`);
    throw new ValidationError(`Validation error`, errors, CODE_400);
  }

  if ((!hotel.offer.title) || (typeof hotel.offer.title !== `string`) || (hotel.offer.title.length < LOW_LIMIT) || (hotel.offer.title.length > UP_LIMIT)) {
    errors.push(`Field title is required and should be from 0 to 140 letters!`);
    fieldName.push(`title`);
  }

  if ((!hotel.offer.type) || (TYPES.indexOf(hotel.offer.type) === -1)) {
    errors.push(`Field hotel is required and should be one of four types!`);
    fieldName.push(`hotel`);
  }

  if ((!hotel.offer.price) || (typeof hotel.offer.price !== `number`) || (hotel.offer.price < START_PRICE) || (hotel.offer.price > END_PRICE)) {
    errors.push(`Field price is required and should be from ${START_PRICE} to ${END_PRICE} $!`);
    fieldName.push(`price`);
  }

  if ((!hotel.offer.address) || (hotel.offer.address.length > ADRESS_LIMIT) || (typeof hotel.offer.address !== `string`)) {
    errors.push(`Field address is required and should be less than 101 letters!`);
    fieldName.push(`address`);
  }

  if ((!hotel.offer.checkin) || (typeof hotel.offer.checkin !== `string`) || (CHECK.indexOf(hotel.offer.checkin) === -1)) {
    errors.push(`Field checkin is required!`);
    fieldName.push(`checkin`);
  }

  if ((!hotel.offer.checkout) || (typeof hotel.offer.checkout !== `string`) || (CHECK.indexOf(hotel.offer.checkout) === -1)) {
    errors.push(`Field checkout is required!`);
    fieldName.push(`checkout`);
  }

  if ((!hotel.offer.rooms) || (typeof hotel.offer.rooms !== `number`) || (hotel.offer.rooms < MIN_ROOM) || (hotel.offer.rooms > MAX_ROOM)) {
    errors.push(`Field rooms is required and should be from ${MIN_ROOM} to ${MAX_ROOM}!`);
    fieldName.push(`rooms`);
  }

  if ((!Array.isArray(hotel.offer.features)) || !(hotel.offer.features.every((it) => FEATURES.indexOf(it) !== -1)) || !(hotel.offer.features.every((it, ind, arr) => arr.indexOf(it) === ind))) {
    errors.push(`Field features should belong to initial values!`);
    fieldName.push(`features`);
  }

  if (typeof hotel.author.name !== `string`) {
    errors.push(`Field name should be text!`);
    fieldName.push(`name`);
  }

  if (errors.length > 0) {
    throw new ValidationError(`Validation error`, fieldName.join(), errors);
  }

  return hotel;
}

module.exports = validateHotel;
