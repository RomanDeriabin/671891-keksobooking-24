const checkRemainderOfDivision = function (number) {
  return (number % 1 !== 0);
};

const getMinInt = function (number) {
  return Math.floor(number);
};

const getRandomIntInclusive = function(from, to){
  try {
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
  } catch (err) {
    return err;
  }
};

const getRandomFractionalNumber = function(from, to, numAfterDecimal) {
  try {
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
  }
  catch (err) {
    return err;
  }
};

getRandomIntInclusive(1.2, 1.3);
getRandomFractionalNumber(1.2, 1.217, -3);

