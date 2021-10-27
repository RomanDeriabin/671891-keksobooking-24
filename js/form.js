'use sctrict';

const formsClass = {
  createAdsFormClass: 'ad-form',
  mapFormClass: 'map__filters',
};

const disabled = function (form, classMask, disabledStatus) {
  const key = disabledStatus ? 'setAttribute' : 'removeAttribute';
  const fields = form.children;
  [...fields].forEach((element) => {
    element[key]('disabled', true);
  });
  if (disabledStatus) {
    form.classList.toggle(`${classMask}--disabled`);
  }
};

const toggleActiveStatus = function(disabledStatus) {
  const createAdsForm = document.querySelector(`.${formsClass.createAdsFormClass}`);
  const mapForm = document.querySelector(`.${formsClass.mapFormClass}`);
  disabled(createAdsForm,formsClass.createAdsFormClass, disabledStatus);
  disabled(mapForm, formsClass.mapFormClass, disabledStatus);
};

export {toggleActiveStatus};
