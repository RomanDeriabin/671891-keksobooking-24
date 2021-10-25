'use sctrict';

import {generateAppartmentData} from './data.js';
import { getTemplateNode, getNodesFromTempate } from './utils.js';

const arrayOfAppartments = generateAppartmentData();
const map = document.querySelector('#map-canvas');
const card = getTemplateNode('#card', '.popup');

const adsCardData = {
  avatarSrc: arrayOfAppartments[0]['autor']['avatar'],
  titleText: arrayOfAppartments[0]['offer']['title'],
  addressText: arrayOfAppartments[0]['offer']['address'],
  price: `${arrayOfAppartments[0]['offer']['price']} р / ночь `,
  type: arrayOfAppartments[0]['offer']['type'],
  guests: `${arrayOfAppartments[0]['offer']['rooms']} комнаты для ${arrayOfAppartments[0]['offer']['guests']} гостей`,
  checkinCheckout: `Заезд после ${arrayOfAppartments[0]['offer']['checkin']}, выезд до ${arrayOfAppartments[0]['offer']['checkout']}`,
  features: arrayOfAppartments[0]['offer']['features'],
  descriptionText: arrayOfAppartments[0]['offer']['description'],
  photos: arrayOfAppartments[0]['offer']['photos'],
};

const adsCardSelectors = {
  avatar: '.popup__avatar',
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  guests: '.popup__text--capacity',
  time: '.popup__text--time',
  featureList: '.popup__features',
  description: '.popup__description',
  photoList: '.popup__photos',
};

const addPropery = function (element, value) {
  const propertyValue = value;
  if (!propertyValue) {
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
  const nodes = getNodesFromTempate(card, adsCardSelectors);

  nodes['avatar'].src = addPropery(nodes['avatar'], adsCardData.avatarSrc);
  nodes['title'].textContent = addPropery(nodes['title'], adsCardData.titleText);
  nodes['address'].textContent = addPropery(nodes['address'], arrayOfAppartments[0]['offer']['address']);
  nodes['price'].textContent = addPropery(nodes['price'], `${arrayOfAppartments[0]['offer']['price']} р / ночь `);
  typeDescr(nodes['type']);
  nodes['guests'].textContent = addPropery(nodes['guests'], `${arrayOfAppartments[0]['offer']['rooms']} комнаты для ${arrayOfAppartments[0]['offer']['guests']} гостей`);
  nodes['time'].textContent = addPropery(nodes['time'], `Заезд после ${arrayOfAppartments[0]['offer']['checkin']}, выезд до ${arrayOfAppartments[0]['offer']['checkout']}`);

  const featureList = nodes['featureList'];
  const features = featureList.querySelectorAll('.popup__feature');
  features.forEach((featureListItem) => {
    const isNecessary = arrayOfAppartments[0]['offer']['features'].some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureListItem.remove();
    }
    if (featureList.children.length === 0) {
      featureList.classList.add('visually-hidden');
    }
  });

  nodes['description'].textContent = addPropery(nodes['description'], arrayOfAppartments[0]['offer']['description']);

  const photoList = nodes['photoList'];
  photoList.innerHTML = '';
  for (let i = 0; i < arrayOfAppartments[0]['offer']['photos'].length; i++) {
    const imgContainer = document.createElement('img');
    imgContainer.classList.add('popup__photo');
    imgContainer.src = arrayOfAppartments[0]['offer']['photos'][i];
    imgContainer.style.width = '45px';
    imgContainer.style.height = '40px';
    photoList.appendChild(imgContainer);
  }
  if (photoList.children.length === 0) {
    photoList.classList.add('visually-hidden');
  }
  map.appendChild(card);

};

export {renderAds};
