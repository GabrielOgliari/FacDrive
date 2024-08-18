import Toast from 'react-native-toast-message';
import { width } from '../utils/dimensions';

export const dispatchToast = (
  message: string,
  config?: { type: 'success' | 'error' | 'info' },
) => {
  Toast.show({
    type: config?.type ?? 'success',
    text1: message,
    text1Style: {
      fontSize: width * 0.04,
    },
  });
};
