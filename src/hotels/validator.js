'use strict';

const ValidateError = require(`../../utils/errors`).ValidateError;

const {START_PRICE, END_PRICE, TYPES, MIN_ROOM, MAX_ROOM, CHECK, FEATURES} = require(`../generate-entity`);

const ADRESS_LIMIT = 100;
const CODE_400 = 400;

let errors = [];

function validateHotel(hotel) {

  if ((!hotel.offer) || (!hotel.author)) {
    errors.push(`Validation error - invalid input format`);
    console.log(`>1>>${errors.length}`);
    throw new ValidateError(`Validation error - invalid input format`, errors, CODE_400);
  }

  if ((!hotel.offer.title) || (typeof hotel.offer.title !== `string`) || (hotel.offer.title.length < 1) || (hotel.offer.title.length > 140)) {
    errors.push(`Field title is required and should be from 0 to 140 letters!`);
  }

  if ((!hotel.offer.title) || (TYPES.indexOf(hotel.offer.type) === -1)) {
    errors.push(`Field hotel is required and should be one of four types!`);
  }

  if ((!hotel.offer.price) || (typeof hotel.offer.price !== `number`) || (hotel.offer.price < START_PRICE) || (hotel.offer.price > END_PRICE)) {
    errors.push(`Field price is required and should be from ${START_PRICE} to ${END_PRICE} $!`);
  }

  if ((!hotel.offer.address) || (hotel.offer.address.length > ADRESS_LIMIT) || (typeof hotel.offer.address !== `string`)) {
    errors.push(`Field address is required and should be less than 101 letters!`);
  }

  if ((!hotel.offer.checkin) || (typeof hotel.offer.checkin !== `string`) || (CHECK.indexOf(hotel.offer.checkin) === -1)) {
    errors.push(`Field checkin is required!`);
  }

  if ((!hotel.offer.checkout) || (typeof hotel.offer.checkout !== `string`) || (CHECK.indexOf(hotel.offer.checkout) === -1)) {
    errors.push(`Field checkout is required!`);
  }

  if ((!hotel.offer.rooms) || (typeof hotel.offer.rooms !== `number`) || (hotel.offer.rooms < MIN_ROOM) || (hotel.offer.rooms > MAX_ROOM)) {
    errors.push(`Field rooms is required and should be from ${MIN_ROOM} to ${MAX_ROOM}!`);
  }

  if (!(hotel.offer.features.every((it) => FEATURES.indexOf(it) !== -1)) || !(hotel.offer.features.every((it, ind, arr) => arr.indexOf(it) === ind))) {
    errors.push(`Field features should belong to initial values!`);
  }

  if (typeof hotel.author.name !== `string`) {
    errors.push(`Field name should be text!`);
  }

  return hotel;
}

function validateHotels(hotels) {
  console.log(`>2>>${errors.length}`);

  if (hotels.length > 0) {
    hotels.forEach((it) => validateHotel(it));
  } else {
    validateHotel(hotels);
  }

  if (errors.length > 0) {
    throw new ValidateError(`Validation errors: ${errors.join()}`, errors, CODE_400);
  }

  console.log(`>3>>${errors.length}`);

  return (errors.length > 0) ? errors.join() : hotels;
}

module.exports = validateHotels;
