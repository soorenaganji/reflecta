export default function generateUniqueDigitNumber(length) {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const result = []
  
    while (result.length < length) {
      const randIndex = Math.floor(Math.random() * digits.length)
      const digit = digits[randIndex]
  
      // اگر رقم هنوز اضافه نشده
      if (!result.includes(digit)) {
        result.push(digit)
      }
    }
  
    // اگه عدد قراره چند رقمی باشه، نباید با صفر شروع شه
    if (result[0] === '0') {
      const nonZeroIndex = result.findIndex((d) => d !== '0')
      if (nonZeroIndex > 0) {
        // جابه‌جایی صفر با عدد غیر صفر
        [result[0], result[nonZeroIndex]] = [result[nonZeroIndex], result[0]]
      }
    }
  
    return result
  }
  