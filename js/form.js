'use sctrict';

const formsClass = {
  createAdsFormClass: 'ad-form',
  mapFormClass: 'map__filters',
};

const selectTypeOfAppartment = document.querySelector('#type');
const minPriceField = document.querySelector('#price');
const selectNumberOfRoom = document.querySelector('#room_number');
const selectCapacity = document.querySelector('#capacity');
const optionsOfCapacity = selectCapacity.querySelectorAll('option');

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

const changeMinPriceHandler = function (evt) {
  switch (evt.target.value) {
    case ('palace'):
      minPriceField.placeholder = 10000;
      minPriceField.min = 10000;
      break;
    case ('flat'):
      minPriceField.placeholder = 1000;
      minPriceField.min = 1000;
      break;
    case ('house'):
      minPriceField.placeholder = 5000;
      minPriceField.min = 5000;
      break;
    case ('bungalow'):
      minPriceField.placeholder = 0;
      minPriceField.min = 0;
      break;
    case ('hotel'):
      minPriceField.placeholder = 3000;
      minPriceField.min = 3000;
      break;
    default:
      minPriceField.placeholder = 0;
      minPriceField.min = 0;
  }
};

const setMinPrice = function () {
  minPriceField.min = 1000;
  selectTypeOfAppartment.addEventListener('change', (evt) => {
    changeMinPriceHandler(evt);
  });
};

const changeNumberAvailableGuests = function(evt) {
  optionsOfCapacity.forEach((element) => {
    element.disabled = true;
  });
  switch (evt.target.value) {
    case ('1'):
      optionsOfCapacity.forEach((element) => {
        if (element.value === '1') {
          element.disabled = false;
          element.selected = true;
        }
      });
      break;
    case ('2'):
      optionsOfCapacity.forEach((element) => {
        if (element.value <= '2' && element.value !== '0') {
          element.disabled = false;
          if(element.value === '2') {
            element.selected = true;
          }
        }
      });
      break;
    case ('3'):
      optionsOfCapacity.forEach((element) => {
        if (element.value <= '3' && element.value !== '0') {
          element.disabled = false;
          if(element.value === '3') {
            element.selected = true;
          }
        }
      });
      break;
    case ('100'):
      optionsOfCapacity.forEach((element) => {
        if (element.value === '0') {
          element.disabled = false;
          element.selected = true;
        }
      });
      break;
  }
};
const setCapacity = function () {
  optionsOfCapacity.forEach((element) => {
    element.disabled = true;
    if (element.value === '1') {
      element.disabled = false;
      element.selected = true;
    }
  });
  selectNumberOfRoom.addEventListener('change', (evt) => {
    changeNumberAvailableGuests(evt);
  });
};

setMinPrice();
setCapacity();


export {toggleActiveStatus};
