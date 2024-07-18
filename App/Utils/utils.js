import Toast from 'react-native-toast-message';

export const ToastBottomHelper = {
  success: (msg, visibilityTime = 2000) => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: msg,
      visibilityTime: 2000,
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
