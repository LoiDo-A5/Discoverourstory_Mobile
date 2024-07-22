import validator from 'validator';

export const isValidPhoneNumber = phoneNumber => {
  return /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
    phoneNumber,
  );
};
export const isValidEmailAddress = emailAddress => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailAddress);
};

export const isValidPhoneNumberOrEmailAddress = data => {
  return isValidPhoneNumber(data) || isValidEmailAddress(data);
};

export const isValidEmail = email => {
  return validator?.isEmail(String(email));
};

export const isValidPhone = phone => {
  const regexNumber = /^\d+$/;
  const regexNumberLength = /^[0-9]{10}/;
  const regexRightPhoneNumber =
    /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/;
  const isNumber = regexNumber?.test(String(phone));
  const enoughLength = regexNumberLength?.test(String(phone));
  const rightPhoneNumber = regexRightPhoneNumber?.test(String(phone));
  return {isNumber, enoughLength, rightPhoneNumber};
};

export const isValidPassword = password => {
  const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  return regexPassword?.test(String(password));
};

export const isHTML = string =>
  /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(string);

export const isValidReferralCode = str => {
  // Check if the string has exactly 6 include uppercase letters or numbers, or is an empty string, or is undefined
  if (!str) {
    return true;
  }
  const regex = /^([A-Z0-9]{6})?$/;
  return regex.test(str);
};
