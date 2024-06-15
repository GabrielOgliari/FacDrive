import { ToastAndroid } from 'react-native';

export const dispatchToast = (message: string) => {
  return ToastAndroid.show(message, ToastAndroid.SHORT);
};
