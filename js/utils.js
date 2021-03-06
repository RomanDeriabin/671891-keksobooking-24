'use sctrict';

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

const getTemplateNode = function (templateTag, contentTag) {
  const templateNode = document.querySelector(templateTag).content;
  const contentNode = templateNode.querySelector(contentTag);
  const clonedNode = contentNode.cloneNode(true);
  return clonedNode;
};

const checkNodeAvailable = (template, tagName) => {
  const element = template.querySelector(tagName);
  if (!element) {
    throw new Error (`${tagName} element not found`);
  }
  return element;
};

const getNodesFromTempate = function(template, elements) {
  const nodes = {};
  for (const key in elements) {
    nodes[key] = checkNodeAvailable(template, elements[key]);
  }
  return nodes;
};


export {getRandomIntInclusive, getRandomFractionalNumber, getTemplateNode, checkNodeAvailable, getNodesFromTempate};
