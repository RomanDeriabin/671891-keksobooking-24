const checkRemainderOfDivision = function (number) {
  return (number % 1 !== 0);
};

const getMinInt = function (number) {
  return Math.floor(number);
};

const getRandomIntInclusive = function(from, to){
  if (from < 0) {
    throw new Error('Диапазон не должен содержать отрицательных чисел');
  }
  else if (from > to) {
    throw new Error('Число "до" должно быть больше числа "от"');
  }
  else if (checkRemainderOfDivision(from) && checkRemainderOfDivision(to) && getMinInt(from) === getMinInt(to)) {
    throw new Error('Диапазон не содержит целого числа');
  }
  else {
    const min = Math.ceil(from);
    const max = Math.floor(to);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};


const getRandomFractionalNumber = function(from, to, numAfterDecimal) {
  if (from < 0) {
    throw new Error('Диапазон не должен содержать отрицательных чисел');
  }
  else if (from > to) {
    throw new Error('Число "до" должно быть больше числа "от"');
  }
  else if (numAfterDecimal < 0) {
    throw new Error('Аргумент не может быть отрицательным');
  }
  else {
    return +(Math.random() * (to - from) + from).toFixed(numAfterDecimal);
  }
};

const TYPE_OF_APPARTEMENT = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_TIME = ['12:00', '13:00','14:00'];
const CHECK_OUT_TIME = ['12:00', '13:00','14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function generatePhotoId () {
  let num = getRandomIntInclusive(1, 10).toString();
  return (num < 10) ? num = 0 + num : num;
}

// Мне на самом деле не очень нравится решение с созданием промежуточного массива. Подозреваю, что есть более рациональное, но я так и не нашел.
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
  const generateNewArrayLength = getRandomIntInclusive(0, PHOTOS .length);
  const gallary = [];
  for (let index = 0; index < generateNewArrayLength; index++) {
    gallary.push(PHOTOS[index]);
  }
  return gallary;
}

const generateAppartmentAd = function () {
  const generatedLat = getRandomFractionalNumber(35.65000, 35.70000, 5);
  const generatedLng = getRandomFractionalNumber(139.70000, 139.80000, 5);
  return {
    autor: {
      avatar: `img/avatars/user${generatePhotoId()}.png`,
    },
    offer: {
      title: 'Лучший выбор',
      address: `${generatedLat.toString()}, ${generatedLng.toString()}`,
      price: getRandomIntInclusive(1, 2000000),
      type: TYPE_OF_APPARTEMENT[getRandomIntInclusive(0, TYPE_OF_APPARTEMENT.length - 1)],
      rooms: getRandomIntInclusive(1, 10),
      guests: getRandomIntInclusive(1, 20),
      checkin: CHECK_IN_TIME[getRandomIntInclusive(0 , CHECK_IN_TIME.length - 1)],
      checkout: CHECK_OUT_TIME[getRandomIntInclusive(0, CHECK_OUT_TIME.length - 1)],
      features: generateAppartmentFeatures(),
      description: 'Это шикарная квартира',
      photos: generateGallary(),
    },
    location: {
      lat: generatedLat,
      lng: generatedLng,
    },
  };
};

generateAppartmentAd();

