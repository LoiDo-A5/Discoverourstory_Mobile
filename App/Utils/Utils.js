import {Platform, PixelRatio, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import t from 'i18n';
import {isValidPassword} from './Validation';
import api from '../Apis/axios';
import {LANGUAGE} from '../Configs/Constant';

const getUuid = require('uuid-by-string');

export const setAxiosDefaultAuthToken = token => {
  api.setHeaders({Authorization: `Token ${token}`});
};

export const setAxiosDefaultLanguage = language => {
  api.setHeaders({
    'Accept-Language': language || LANGUAGE.DEFAULT,
  });
};

export const deleteDefaultAuthToken = () => {
  delete api.headers.Authorization;
};

const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();

export const getCountryCodeForRegion = regionCode => {
  return phoneUtil.getCountryCodeForRegion(regionCode); //ex: input: "VN" -> output: "84"
};

export const getDeviceId = () => {
  return Platform.OS === 'ios'
    ? DeviceInfo.getUniqueId()
    : getUuid(DeviceInfo.getUniqueId());
};

export const isObjectEmpty = obj => {
  return Object.keys(obj).length === 0;
};

export const formatNumberCompact = number => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number);
};

export const formatMoney = (number, fixed = 0, currency = 'đ') => {
  return (
    parseInt(number, 10)
      .toFixed(fixed)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ` ${currency}`
  );
};

export const standardizeCameraScreenSize = width => {
  let delta = 100;
  let standardizeWidth = 0;
  let standardizeHeight = 0;
  for (let i = -3; i < 4; i++) {
    if (((width + i) * PixelRatio.get() * 3) % 7 < delta) {
      delta = ((width + i) * PixelRatio.get() * 3) % 7;
      standardizeWidth = width + i;
      standardizeHeight = ((width + i) * 3) / 7;
    }
  }
  return {
    standardizeWidth: standardizeWidth,
    standardizeHeight: standardizeHeight,
  };
};

export const openMapDirection = item => () => {
  // https://developers.google.com/maps/documentation/urls/get-started#universal-cross-platform-syntax
  const url = `https://www.google.com/maps/dir/?api=1&origin=&destination=${item.lat},${item.lng}`;
  Linking.openURL(url);
};

export const ToastBottomHelper = {
  success: (msg, visibilityTime = 2000) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: msg,
      visibilityTime: visibilityTime,
    });
  },
  error: (msg, visibilityTime = 2000) => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: msg,
      visibilityTime: visibilityTime,
    });
  },
};

export const insertToString = (str, index, value) => {
  return str.substr(0, index) + value + str.substr(index);
};

export const removeFromString = (str, index) => {
  return str.substr(0, index) + str.substr(index + 1);
};

export const validateField = (key, value, password = '', nextCondition) => {
  const checkCaseErrors = (textEnter = '') => {
    const isPassword = isValidPassword(value);
    if (value === '') {
      return textEnter;
    }
    if (!isPassword) {
      return t('password_must_be_strong');
    }
    if (password) {
      if (value !== password && password !== '') {
        return t('validate_password_not_match');
      }
    }
    return nextCondition && nextCondition();
  };
  switch (key) {
    case 'current_password':
      return checkCaseErrors(t('please_enter_your_current_password'));
    case 'new_password':
      return checkCaseErrors(t('please_enter_new_password'));
    case 'confirm_password': {
      return checkCaseErrors(t('please_enter_your_confirm_password'));
    }
    default:
      return '';
  }
};

export default {
  isObjectEmpty,
  insertToString,
};
