'use sctrict';

import {getRandomIntInclusive, getRandomFractionalNumber} from './utils.js';

const TYPE_OF_APPARTEMENT = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_TIME = ['12:00', '13:00','14:00'];
const CHECK_OUT_TIME = ['12:00', '13:00','14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const DESCRIPTION = ['В историческом районе города', 'Живописная природа', 'Большая территория', 'В 15 минутах от моря'];

function generatePhotoId () {
  let num = getRandomIntInclusive(1, 10).toString();
  return (num < 10) ? num = 0 + num : num;
}

function generateAppartmentFeatures () {
  const generateNewArrayLength = getRandomIntInclusive(0, FEATURES.length);
  const interimArray = FEATURES.slice();
  const appartmentFeatures = [];
  for (let index = 0; index < generateNewArrayLength; index++) {
    const generatedRandomItem = getRandomIntInclusive(0, interimArray.length-1);
    appartmentFeatures.push(interimArray[generatedRandomItem]);
    interimArray.splice(generatedRandomItem, 1);
  }
  return appartmentFeatures;
}

function generateGallary () {
  const generateNewArrayLength = getRandomIntInclusive(0, PHOTOS.length);
  const gallary = [];
  for (let index = 0; index < generateNewArrayLength; index++) {
    gallary.push(PHOTOS[index]);
  }
  return gallary;
}

function createRandomAutor() {
  return {
    avatar: `img/avatars/user${generatePhotoId()}.png`,
  };
}
function createRandomOffer(lat, lng) {
  return {
    title: 'Лучший выбор',
    address: `${lat.toString()}, ${lng.toString()}`,
    price: getRandomIntInclusive(1, 2000000),
    type: TYPE_OF_APPARTEMENT[getRandomIntInclusive(0, TYPE_OF_APPARTEMENT.length - 1)],
    rooms: getRandomIntInclusive(1, 10),
    guests: getRandomIntInclusive(1, 20),
    checkin: CHECK_IN_TIME[getRandomIntInclusive(0, CHECK_IN_TIME.length - 1)],
    checkout: CHECK_OUT_TIME[getRandomIntInclusive(0, CHECK_OUT_TIME.length - 1)],
    features: generateAppartmentFeatures(),
    description: DESCRIPTION[getRandomIntInclusive(0, DESCRIPTION.length-1)],
    photos: generateGallary(),
  };
}

const getRandomAppartmentsData = function () {
  const generatedLat = getRandomFractionalNumber(35.65000, 35.70000, 5);
  const generatedLng = getRandomFractionalNumber(139.70000, 139.80000, 5);
  return {
    autor: createRandomAutor(),
    offer: createRandomOffer(generatedLat, generatedLng),
    location: {
      lat: generatedLat,
      lng: generatedLng,
    },
  };
};

const generateAppartmentData = function() {
  const appartmentsArray = [];
  for (let it = 0; it < 10; it++) {
    appartmentsArray.push(getRandomAppartmentsData());
  }
  return appartmentsArray;
};

export {generateAppartmentData};
