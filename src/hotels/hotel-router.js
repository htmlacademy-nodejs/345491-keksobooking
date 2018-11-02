'use strict';

const express = require(`express`);
const {ArgumentError, ValidationError} = require(`../utils/errors`);
const multer = require(`multer`);
const validateHotel = require(`./validator`);
const toStream = require(`buffer-to-stream`);
const logger = require(`../logger`);

const SKIP_COUNT = 0;
const LIMIT_COUNT = 20;
const MIME_IMAGE_JPG = `image/jpg`;
const MIME_IMAGE_PNG = `image/png`;

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

const ALLOW_CORS = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
};

hotelRouter.use(ALLOW_CORS);

hotelRouter.get(``, asyncMiddleware(async (req, res) => {

  const skipCount = parseInt(req.query.skip, 10);
  const limitCount = parseInt(req.query.limit, 10);

  if ((typeof limitCount !== `number`) || (typeof skipCount !== `number`)) {
    throw new ArgumentError(`Неверный запрос.`);
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
      if ((files[`avatar`][0].mimetype !== MIME_IMAGE_JPG) || (files[`avatar`][0].mimetype !== MIME_IMAGE_PNG)) {
        throw new ValidationError(`Validation error - invalid input format`, `invalid type of picture`);
      }
    }

    if ((files[`preview`][0])) {
      body.offer.preview = `${files[`preview`][0].path}`;
      if ((files[`preview`][0].mimetype !== MIME_IMAGE_JPG) || (files[`preview`][0].mimetype !== MIME_IMAGE_PNG)) {
        throw new ValidationError(`Validation error - invalid input format`, `invalid type of picture`);
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

  res.header(`Content-Type`, MIME_IMAGE_JPG);
  res.header(`Content-Length`, result.info.length);
  res.on(`error`, (e) => logger.error(e));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (e) => logger.error(e));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
}));

module.exports = (offerStore, imageStore) => {
  hotelRouter.offerStore = offerStore;
  hotelRouter.imageStore = imageStore;
  return hotelRouter;
};
