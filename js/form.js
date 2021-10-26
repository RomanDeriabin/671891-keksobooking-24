'use sctrict';

const createAdsFormClass = 'ad-form';
const mapFormClass  = 'map__filters';

const disableda = function (form, classMask, disabledStatus) {
  if (disabledStatus) {
    form.classList.add(`${classMask}--disabled`);
    const fieldsets = form.querySelectorAll('fieldset');
    [...fieldsets].forEach((element) => {
      element.setAttribute('disabled', true);
    });
  }
  else {
    form.classList.remove(`${classMask}--disabled`);
    const fieldsets = form.querySelectorAll('fieldset');
    [...fieldsets].forEach((element) => {
      element.removeAttribute('disabled');
    });
  }
};

const disabledPage = function(disabledStatus) {
  const createAdsForm = document.querySelector(`.${createAdsFormClass}`);
  const mapForm = document.querySelector(`.${mapFormClass}`);
  disableda(createAdsForm,createAdsFormClass, disabledStatus);
  disableda(mapForm, mapFormClass, disabledStatus);
};

export {disabledPage};
