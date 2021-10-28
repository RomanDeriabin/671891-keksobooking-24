'use sctrict';

import { getTemplateNode, getNodesFromTempate } from './utils.js';

const card = getTemplateNode('#card', '.popup');

const getDataForNodes = function (appartmentData){
  return {
    avatarSrc: appartmentData['autor']['avatar'],
    titleText: appartmentData['offer']['title'],
    addressText: appartmentData['offer']['address'],
    price: `${appartmentData['offer']['price']} р / ночь `,
    type: appartmentData['offer']['type'],
    guests: `${appartmentData['offer']['rooms']} комнаты для ${appartmentData['offer']['guests']} гостей`,
    checkinCheckout: `Заезд после ${appartmentData['offer']['checkin']}, выезд до ${appartmentData['offer']['checkout']}`,
    features: appartmentData['offer']['features'],
    descriptionText: appartmentData['offer']['description'],
    photos: appartmentData['offer']['photos'],
  };
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

const getAppartmentType = (type) => {
  switch (type) {
    case ('palace'):
      return 'Дворец';
    case ('flat'):
      return 'Квартира';
    case ('house'):
      return 'Дом';
    case ('bungalow'):
      return 'Бунгало';
    case ('hotel'):
      return 'Отель';
    default:
      return 'Неопознанный тип';
  }
};

const appendFeatures = function(dataForNode, featureList, features) {
  if (dataForNode.features.length === 0) {
    featureList.classList.add('visually-hidden');
    return;
  }
  features.forEach((featureListItem) => {
    const isNecessary = dataForNode.features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureListItem.remove();
    }
  });
};

const appendPhotos = function(dataForNode, photoList) {
  if (dataForNode.photos.length === 0) {
    photoList.classList.add('visually-hidden');
    return;
  }
  photoList.innerHTML = '';
  dataForNode.photos.forEach((photo) =>{
    const imgContainer = document.createElement('img');
    imgContainer.classList.add('popup__photo');
    imgContainer.src = photo;
    imgContainer.style.width = '45px';
    imgContainer.style.height = '40px';
    photoList.appendChild(imgContainer);
  });
};

const renderAds = function (dataAppartment, appentNode) {
  const nodes = getNodesFromTempate(card, adsCardSelectors);
  const dataForNode = getDataForNodes(dataAppartment);
  nodes['avatar'].src = addPropery(nodes['avatar'], dataForNode.avatarSrc);
  nodes['title'].textContent = addPropery(nodes['title'], dataForNode.titleText);
  nodes['address'].textContent = addPropery(nodes['address'], dataForNode.addressText);
  nodes['price'].textContent = addPropery(nodes['price'], dataForNode.price);
  nodes['type'].textContent = getAppartmentType(dataForNode.type);
  nodes['guests'].textContent = addPropery(nodes['guests'], dataForNode.guests);
  nodes['time'].textContent = addPropery(nodes['time'], dataForNode.checkinCheckout);
  nodes['description'].textContent = addPropery(nodes['description'], dataForNode.descriptionText);
  const featureList = nodes['featureList'];
  const features = featureList.querySelectorAll('.popup__feature');
  appendFeatures(dataForNode, featureList, features);
  const photoList = nodes['photoList'];
  appendPhotos(dataForNode, photoList);
  appentNode.appendChild(card);
};

export {renderAds};
