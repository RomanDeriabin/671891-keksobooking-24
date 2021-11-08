'use sctrict';

const formsClass = {
  createAdsFormClass: 'ad-form',
  mapFormClass: 'map__filters',
};

const minPriceByHouse = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalow: '0',
  hotel: '3000',
};

const amountPlaceByRoom = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const INITIAL_MINIMUM_PRICE = 1000;
const MAX_PRICE = 1000000;

const selectTypeOfAppartment = document.querySelector('#type');
const minPriceField = document.querySelector('#price');
const selectNumberOfRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const optionsOfCapacity = selectCapacity.querySelectorAll('option');
const titleField = document.querySelector('#title');
const checkInField = document.querySelector('#timein');
const checkOutField = document.querySelector('#timeout');

const disabled = function (form, classMask, disabledStatus) {
  const key = disabledStatus ? 'setAttribute' : 'removeAttribute';
  const fields = form.children;
  [...fields].forEach((element) => {
    element[key]('disabled', true);
  });
  form.classList.toggle(`${classMask}--disabled`, disabledStatus);
};

const toggleActiveStatus = function(disabledStatus) {
  const createAdsForm = document.querySelector(`.${formsClass.createAdsFormClass}`);
  const mapForm = document.querySelector(`.${formsClass.mapFormClass}`);
  disabled(createAdsForm,formsClass.createAdsFormClass, disabledStatus);
  disabled(mapForm, formsClass.mapFormClass, disabledStatus);
};

const fieldValidityLengthHandler = function (element, minlength, maxlength) {
  element.addEventListener('input', () => {
    const valueLength = element.value.length;
    if (valueLength < minlength) {
      element.setCustomValidity(`Еще ${minlength - valueLength} символов`);
    }
    else if (valueLength > maxlength) {
      element.setCustomValidity(`Удалите ${valueLength - maxlength} символов`);
    }
    else {
      element.setCustomValidity('');
    }
    element.reportValidity();
  });
};

const fieldMaxNumberValidityHandler = function (element, maxNumber) {
  element.addEventListener('input', () => {
    const value = Number(element.value);
    if (value > maxNumber) {
      element.setCustomValidity(`Цена не может быть больше ${maxNumber} руб. за ночь`);
    }
    else {
      element.setCustomValidity('');
    }
    element.reportValidity();
  });
};

fieldValidityLengthHandler(titleField, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);

fieldMaxNumberValidityHandler(minPriceField, MAX_PRICE);

const changeMinPriceHandler = function (value) {
  minPriceField.placeholder = value;
  minPriceField.min = value;
};

const setMinPrice = function () {
  minPriceField.min = INITIAL_MINIMUM_PRICE;
  selectTypeOfAppartment.addEventListener('change', (evt) => {
    const houseType = evt.target.value;
    const minimalPrice = minPriceByHouse[houseType];
    if (!minimalPrice) {
      throw Error('unknown type');
    }
    changeMinPriceHandler(minimalPrice);
  });
};

function setOptionDisabledStatus(select, flag) {
  select.forEach((element) => {
    element.disabled = flag;
  });
}

function setOptionActivateByValue(select, value) {
  select.forEach((element) => {
    [...value].forEach((guests) => {
      if(element.value === guests) {
        element.disabled = false;
        element.selected = true;
      }
    });
  });
}

const setInitialCapacity = function () {
  setOptionDisabledStatus(optionsOfCapacity, true);
  setOptionActivateByValue(optionsOfCapacity, '1');
};

selectNumberOfRoom.addEventListener('change', (evt) => {
  const value = evt.target.value;
  const placeCount = amountPlaceByRoom[value];
  if (!placeCount) {
    throw Error ('unknown place count');
  }
  setOptionDisabledStatus(optionsOfCapacity, true);
  setOptionActivateByValue(optionsOfCapacity, placeCount);
});

const setCheckinCheckout = function(selectedField, synchField) {
  selectedField.addEventListener('change', (evt) => {
    const value = evt.target.value;
    synchField.value = value;
  });
};

setCheckinCheckout(checkInField, checkOutField);
setCheckinCheckout(checkOutField, checkInField);
setMinPrice();
setInitialCapacity();

export {toggleActiveStatus};
