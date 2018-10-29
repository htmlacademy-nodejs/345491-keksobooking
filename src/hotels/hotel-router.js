'use strict';

const express = require(`express`);
const ArgumentError = require(`../../utils/errors`).ArgumentError;
const multer = require(`multer`);
const validateHotel = require(`./validator`);
const toStream = require(`buffer-to-stream`);
const ValidationError = require(`../../utils/errors`).ValidationError;

const CODE_400 = 400;
const SKIP_COUNT = 0;
const LIMIT_COUNT = 20;

const hotelRouter = new express.Router();
const upload = multer({storage: multer.memoryStorage()});
const parser = express.json();

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const doSkip = async (cursor, skip = SKIP_COUNT, limit = (LIMIT_COUNT + skip)) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

hotelRouter.get(``, asyncMiddleware(async (req, res) => {

  const skipCount = parseInt(req.query.skip, 10);
  const limitCount = parseInt(req.query.limit, 10);

  if ((typeof limitCount !== `number`) || (typeof skipCount !== `number`)) {
    throw new ArgumentError(`Неверный запрос.`, CODE_400);
  }

  res.send(await doSkip(await hotelRouter.offerStore.getAllHotels(), skipCount, limitCount));
}));

hotelRouter.get(`/:date`, asyncMiddleware(async (req, res) => {

  const offerDate = parseInt(req.params.date, 10);

  if (!offerDate || (typeof offerDate !== `number`)) {
    res.status(400).send(`Неверный запрос.`);
  }

  const found = await hotelRouter.offerStore.getHotelByDate(offerDate);

  if (!found) {
    res.status(404).send(`Предложение не найдено.`);
  }

  res.send(found);
}));

const hotelMedia = upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]);

hotelRouter.post(``, parser, hotelMedia, asyncMiddleware(async (req, res) => {

  const body = req.body;
  const files = req.files;

  if (files) {
    if ((files[`avatar`][0])) {
      body.author.avatar = `${files[`avatar`][0].path}`;
      if ((files[`avatar`][0].mimetype !== `image/jpg`) || (files[`avatar`][0].mimetype !== `image/png`)) {
        throw new ValidationError(`Validation error - invalid input format`, `invalid type of picture`, CODE_400);
      }
    }

    if ((files[`preview`][0])) {
      body.offer.preview = `${files[`preview`][0].path}`;
      if ((files[`preview`][0].mimetype !== `image/jpg`) || (files[`preview`][0].mimetype !== `image/png`)) {
        throw new ValidationError(`Validation error - invalid input format`, `invalid type of picture`, CODE_400);
      }
    }
  }

  const validated = validateHotel(body);
  const result = await hotelRouter.offerStore.save(validated);
  const insertedId = result.insertedId;

  if ((files) && (files[`avatar`][0])) {
    await hotelRouter.imageStore.save(insertedId, toStream(files[`avatar`][0].buffer));
  }

  res.send(validated);

}));

hotelRouter.get(`/:date/avatar`, asyncMiddleware(async (req, res) => {
  const offerDate = parseInt(req.params.date, 10);

  if (!offerDate || (typeof offerDate !== `number`)) {
    res.status(400).send(`Неверный запрос.`);
  }

  const found = await hotelRouter.offerStore.getHotelByDate(offerDate);

  if (!found) {
    res.status(400).send(`Предложение не найдено.`);
  }

  const result = await hotelRouter.imageStore.get(found._id);
  if (!result) {
    res.status(404).send(`Аватар не найден.`);
  }

  res.header(`Content-Type`, `image/jpg`);
  res.header(`Content-Length`, result.info.length);
  res.on(`error`, (e) => console.error(e));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (e) => console.error(e));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
}));

module.exports = (offerStore, imageStore) => {
  hotelRouter.offerStore = offerStore;
  hotelRouter.imageStore = imageStore;
  return hotelRouter;
};
