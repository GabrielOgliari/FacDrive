import { TouchableOpacity } from 'react-native';
import * as S from './styles';

type ChangeImageContainerProps = {
  onPress: () => void;
  srcImage?: string;
};

export const ChangeImageContainer = ({
  onPress,
  srcImage,
}: ChangeImageContainerProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {srcImage && (
        <S.StyleImage source={{ uri: srcImage }} resizeMode="cover" />
      )}
    </TouchableOpacity>
  );
};
