export default function generateUniqueDigitNumber(length, usedSet = new Set()) {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result;
  do {
    result = [];
    while (result.length < length) {
      const randIndex = Math.floor(Math.random() * digits.length);
      const digit = digits[randIndex];
      if (!result.includes(digit)) {
        result.push(digit);
      }
    }
    if (result[0] === '0') {
      const nonZeroIndex = result.findIndex((d) => d !== '0');
      if (nonZeroIndex > 0) {
        [result[0], result[nonZeroIndex]] = [result[nonZeroIndex], result[0]];
      }
    }
  } while (usedSet.has(result.join('')));
  usedSet.add(result.join(''));
  return result;
}
