import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';

type ChangeImageContainerProps = {
  onPress: () => void;
  srcImage?: string;
  srcBase64?: string;
};

export const ChangeImageContainer = ({
  onPress,
  srcImage,
  srcBase64,
}: ChangeImageContainerProps) => {
  const imageSource = srcImage
    ? { uri: srcImage }
    : srcBase64
    ? { uri: `data:image/png;base64,${srcBase64}` }
    : null;

  return (
    <>
      {!imageSource ? (
        <S.PersonContainer onPress={onPress}>
          <Icon name="user" size={60} color="#ffffff" />
        </S.PersonContainer>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <S.StyleImage source={imageSource} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </>
  );
};
