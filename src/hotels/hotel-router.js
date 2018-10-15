'use strict';

const express = require(`express`);
const hotelRouter = new express.Router();
const generateElements = require(`../../utils/generate-elements`);
const ArgumentError = require(`../../utils/errors`);
const multer = require(`multer`);
// const storage = multer.memoryStorage();
const upload = multer({storage: multer.memoryStorage()});

const CODE_400 = 400;
const CODE_404 = 404;
const SKIP_COUNT = 0;
const LIMIT_COUNT = 20;

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

hotelRouter.post(``, parser, upload.single(`avatar`), (req, res) => {

  const body = req.body;
  const avatar = req.file;

  if (avatar) {
    body.avatar = {flatName: avatar.originalname};
  }

  res.send(body);

});

module.exports = {hotelRouter, hotels};
