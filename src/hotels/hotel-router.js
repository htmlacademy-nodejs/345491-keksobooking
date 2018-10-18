'use strict';

const express = require(`express`);
const generateElements = require(`../../utils/generate-elements`);
const ArgumentError = require(`../../utils/errors`).ArgumentError;
const ValidateError = require(`../../utils/errors`).ValidateError;
const multer = require(`multer`);
const validateHotels = require(`./validator`);

const CODE_400 = 400;
const CODE_404 = 404;
const SKIP_COUNT = 0;
const LIMIT_COUNT = 20;

const hotelRouter = new express.Router();
const upload = multer({storage: multer.memoryStorage()});
const hotels = generateElements(LIMIT_COUNT);
const parser = express.json();

hotelRouter.get(``, (req, res) => {

  const skipCount = parseInt(req.query.skip, 10);
  const limitCount = parseInt(req.query.limit, 10);

  if ((typeof limitCount !== `number`) || (typeof skipCount !== `number`)) {
    throw new ArgumentError(`Неверный запрос.`, CODE_400);
  }

  const filteredHotels = hotels.slice((skipCount || SKIP_COUNT), ((skipCount + limitCount) || LIMIT_COUNT));

  res.send(filteredHotels);
});

hotelRouter.get(`/:date`, (req, res) => {

  const offerDate = parseInt(req.params.date, 10);
  console.log(typeof offerDate);

  if (!offerDate || (typeof offerDate !== `number`)) {
    throw new ArgumentError(`Неверный запрос.`, CODE_400);
  }

  const found = hotels.find((it) => it.date === offerDate);

  if (!found) {
    throw new ArgumentError(`Предложение не найдено.`, CODE_404);
  }

  res.send(found);
});

const hotelMedia = upload.fields([{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}]);

hotelRouter.post(``, parser, hotelMedia, (req, res) => {

  const body = req.body;
  const files = req.files;

  files[`avatar`][0].path = `${__dirname}/../../static/img/avatars/user01.png`;
  files[`preview`][0].path = `${__dirname}/../../static/img/avatars/user02.png`;

  if (files[`avatar`][0]) {
    body.author.avatar = `${files[`avatar`][0].path}`;
    if ((files[`avatar`][0].mimetype !== `image/jpg`) || (files[`avatar`][0].mimetype !== `image/png`)) {
      throw new ValidateError(`Validation error - invalid input format`, `invalid type of picture`, CODE_400);
    }
  }

  if (files[`preview`][0]) {
    body.offer.preview = `${files[`preview`][0].path}`;
    if ((files[`preview`][0].mimetype !== `image/jpg`) || (files[`preview`][0].mimetype !== `image/png`)) {
      throw new ValidateError(`Validation error - invalid input format`, `invalid type of picture`, CODE_400);
    }
  }

  res.send(validateHotels(body));

});

hotelRouter.use((err, req, res, _next) => {
  if (err instanceof ValidateError) {
    console.error(err);
    res.status(err.code).json(err.errors);
  }
});

module.exports = {hotelRouter, hotels};
