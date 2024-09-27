import Toast from 'react-native-toast-message';

type Props = {
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
};

export const dispatchToast = ({
  type = 'success',
  title,
  description,
}: Props) => {
  Toast.show({
    type,
    text1: String(title ?? ''),
    text2: String(description ?? ''),
  });
};
