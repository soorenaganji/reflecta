export default function normalizeGender(gender) {
  // کلیدواژه‌های انگلیسی
  const english = ["Male", "Female", "Prefer Not to Say", "non-binary"];

  // کلیدواژه‌های فارسی
  const farsi = ["مرد", "زن", "ترجیح می‌دهم نگویم", "غیردوجنسیتی"];

  // کلیدواژه‌های ایتالیایی
  const italian = ["Maschio", "Femmina", "Preferisco non dirlo", "Non binario"];

  // اول چک کن انگلیسیه
  const idxEn = english.findIndex(e => e.toLowerCase() === gender.toLowerCase());
  if (idxEn !== -1) return english[idxEn];

  // بعد چک کن فارسیه
  const idxFa = farsi.indexOf(gender);
  if (idxFa !== -1) return english[idxFa];

  // بعد چک کن ایتالیاییه
  const idxIt = italian.map(i => i.toLowerCase()).indexOf(gender.toLowerCase());
  if (idxIt !== -1) return english[idxIt];

  // اگر پیدا نشد مقدار ورودی رو برگردون (یا هر چیزی دوست داری)
  return gender;
}
