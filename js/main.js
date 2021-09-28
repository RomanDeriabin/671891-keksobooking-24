const checkRemainderOfDivision = function (number) {
  return (number % 1 === 0);
};

const getMinInt = function (number) {
  return Math.floor(number);
};

const getRandomIntInclusive = function(from, to){
  if (from >= 0 && to > from) {
    if (checkRemainderOfDivision(from) || checkRemainderOfDivision(to) || getMinInt(from) < getMinInt(to)) {
      const min = Math.ceil(from);
      const max = Math.floor(to);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  return 'Некорректный диапазон. Диапазон должен: \n - Не содержать отрицательных чисел \n - Число "до" должно быть больше числа "от"  \n - Содержать как минимум одно целое число';
};

const getCustomRandom = function(from, to, numAfterDecimal) {
  return (from >= 0 && to > from && numAfterDecimal >= 0) ? (Math.random() * (to - from) + from).toFixed(numAfterDecimal) : 'Проверьте правильность введенных значений. Условия: \n - Диапазон должен не содержать отрицательных чисел \n - Число "до" должно быть больше числа "от" \n - Значение количества чисел после запятой не отрицательное';
};

// etCustomRandom(1.2, 1.217, -3);
console.log(getCustomRandom(1.2, 1.217, 0));

// getRandomIntInclusive(1.2, 1.3);
console.log(getRandomIntInclusive(1, 3.4));
