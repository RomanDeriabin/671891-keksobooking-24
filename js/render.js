'use sctrict';

import {generateAppartmentData} from './data.js';

const arrayOfAppartments = generateAppartmentData();

const map = document.querySelector('#map-canvas');

const cardTemplate = document.querySelector('#card').content;
const cardContent = cardTemplate.querySelector('.popup');
const card = cardContent.cloneNode(true);

const makeElementFromTemplate = function (tagName) {
  const element = card.querySelector(tagName);
  return element;
};

const addPropery = function (element, value) {
  const propertyValue = value;
  if (!propertyValue) {
    console(!!propertyValue);
    element.classList.add('visually-hidden');
  }
  return propertyValue;
};

const typeDescr = (type) => {
  switch (arrayOfAppartments[0]['offer']['type']) {
    case ('palace'):
      type.textContent = 'Дворец';
      break;
    case ('flat'):
      type.textContent = 'Квартира';
      break;
    case ('house'):
      type.textContent = 'Дом';
      break;
    case ('bungalow'):
      type.textContent = 'Бунгало';
      break;
    case ('hotel'):
      type.textContent = 'Отель';
      break;
    default:
      addPropery(type, arrayOfAppartments[0]['offer']['type']);
  }
};

const renderAds = function () {
  const avatar = makeElementFromTemplate('.popup__avatar');
  avatar.src = addPropery(avatar, arrayOfAppartments[0]['autor']['avatar']);

  const title = makeElementFromTemplate('.popup__title');
  title.textContent = addPropery(title, arrayOfAppartments[0]['offer']['title']);

  const address = makeElementFromTemplate('.popup__text--address');
  address.textContent = addPropery(address, arrayOfAppartments[0]['offer']['address']);

  const price = makeElementFromTemplate('.popup__text--price');
  price.textContent = addPropery(price, `${arrayOfAppartments[0]['offer']['price']} р / ночь `);

  const type = makeElementFromTemplate('.popup__type');
  typeDescr(type);

  const guests = makeElementFromTemplate('.popup__text--capacity');
  guests.textContent = addPropery(guests, `${arrayOfAppartments[0]['offer']['rooms']} комнаты для ${arrayOfAppartments[0]['offer']['guests']} гостей`);

  const time = makeElementFromTemplate('.popup__text--time');
  time.textContent = addPropery(time, `Заезд после ${arrayOfAppartments[0]['offer']['checkin']}, выезд до ${arrayOfAppartments[0]['offer']['checkout']}`);

  const featureList = card.querySelector('.popup__features');
  const features = featureList.children;
  const featuresList = featureList.querySelectorAll('.popup__feature');
  featuresList.forEach((featureListItem) => {
    const isNecessary = arrayOfAppartments[0]['offer']['features'].some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureListItem.remove();
    }
    if (features.length === 0) {
      featureList.classList.add('visually-hidden');
    }
  });

  const descr = makeElementFromTemplate('.popup__description');
  descr.textContent = addPropery(descr, arrayOfAppartments[0]['offer']['description']);

  const photo = makeElementFromTemplate('.popup__photos');
  const photos = photo.children;
  photo.innerHTML = '';
  for (let i = 0; i < arrayOfAppartments[0]['offer']['photos'].length; i++) {
    const imgContainer = document.createElement('img');
    imgContainer.classList.add('popup__photo');
    imgContainer.src = arrayOfAppartments[0]['offer']['photos'][i];
    imgContainer.style.width = '45px';
    imgContainer.style.height = '40px';
    photo.appendChild(imgContainer);
  }
  if (photos.length === 0) {
    photo.classList.add('visually-hidden');
  }
  map.appendChild(card);

};


export {renderAds};
