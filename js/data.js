'use sctrict';

import {getRandomIntInclusive, getRandomFractionalNumber} from './utils.js';
import {TYPE_OF_APPARTEMENT, CHECK_IN_TIME, CHECK_OUT_TIME, FEATURES, PHOTOS, DESCRIPTION} from './constants.js';

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

function generateLocation() {
  const lat = getRandomFractionalNumber(35.65000, 35.70000, 5);
  const lng = getRandomFractionalNumber(139.70000, 139.80000, 5);
  return {
    lat,
    lng,
  };
}

const getRandomAppartmentsData = function () {
  const generatedLocation = generateLocation();
  return {
    autor: createRandomAutor(),
    offer: createRandomOffer(generatedLocation.lat, generatedLocation.lng),
    location: generatedLocation,
  };
};

const generateAppartmentData = function() {
  const appartmentsArray = [];
  for (let it = 0; it < 1; it++) {
    appartmentsArray.push(getRandomAppartmentsData());
  }
  return appartmentsArray;
};

export {generateAppartmentData};
