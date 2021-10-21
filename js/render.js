'use sctrict';

import {generateAppartmentData} from './data.js';

const arrayOfAppartments = generateAppartmentData();
const adsTemplate = document.querySelector('#card').content;
const item = adsTemplate.querySelector('.popup');
const map = document.querySelector('.map');
const adsItem = item.cloneNode(true);
const adsItemAvatar = adsItem.querySelector('.popup__avatar');
const adsItemTitle = adsItem.querySelector('.popup__title');
const adsItemAddress = adsItem.querySelector('.popup__text--address');
const adsItemPrice = adsItem.querySelector('.popup__text--price');
const adsItemType = adsItem.querySelector('.popup__type');
const adsItemGuests = adsItem.querySelector('.popup__text--capacity');
const adsItemTime = adsItem.querySelector('.popup__text--time');
const adsItemFeaturesList = adsItem.querySelectorAll('.popup__feature');
const adsItemDescr = adsItem.querySelector('.popup__description');
const adsItemPhoto = adsItem.querySelector('.popup__photos');

const typeDescr = () => {
  switch (arrayOfAppartments[0]['offer']['type']) {
    case ('palace'):
      adsItemType.textContent = 'Дворец';
      break;
    case ('flat'):
      adsItemType.textContent = 'Квартира';
      break;
    case ('house'):
      adsItemType.textContent = 'Дом';
      break;
    case ('bungalow'):
      adsItemType.textContent = 'Бунгало';
      break;
    case ('hotel'):
      adsItemType.textContent = 'Отель';
      break;
    default:
      adsItemType.textContent = 'Это что';
  }
};

const renderAds = function () {
  adsItemAvatar.src = arrayOfAppartments[0]['autor']['avatar'];
  adsItemTitle.textContent = arrayOfAppartments[0]['offer']['title'];
  adsItemAddress.textContent = arrayOfAppartments[0]['offer']['address'];
  adsItemPrice.textContent = `${arrayOfAppartments[0]['offer']['price']} р / ночь `;
  typeDescr();
  adsItemGuests.textContent = `${arrayOfAppartments[0]['offer']['rooms']} комнаты для ${arrayOfAppartments[0]['offer']['guests']} гостей`;
  adsItemTime.textContent = `Заезд после ${arrayOfAppartments[0]['offer']['checkin']}, выезд до ${arrayOfAppartments[0]['offer']['checkout']}`;
  adsItemFeaturesList.forEach((featureListItem) => {
    const isNecessary = arrayOfAppartments[0]['offer']['features'].some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureListItem.remove();
    }
  });
  adsItemDescr.textContent = arrayOfAppartments[0]['offer']['description'];
  adsItemPhoto.innerHTML = '';
  for (let it = 0; it < arrayOfAppartments[0]['offer']['photos'].length; it++) {
    const imgContainer = document.createElement('img');
    imgContainer.classList.add('popup__photo');
    imgContainer.src = arrayOfAppartments[0]['offer']['photos'][it];
    imgContainer.style.width = '45px';
    imgContainer.style.height = '40px';
    adsItemPhoto.appendChild(imgContainer);
  }
  map.appendChild(adsItem);

};

export {renderAds};
