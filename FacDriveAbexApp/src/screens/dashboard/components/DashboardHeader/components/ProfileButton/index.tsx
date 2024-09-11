import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as S from './styles';

type ProfileButtonProps = {
  onProfile: () => void;
  srcImage?: string;
};

export const ProfileButton = ({ onProfile, srcImage }: ProfileButtonProps) => {
  if (!srcImage) {
    return (
      <S.PersonButton onPress={onProfile}>
        <Icon name="user" size={22} color="#ffffff" />
      </S.PersonButton>
    );
  }

  return (
    <TouchableOpacity onPress={onProfile}>
      <S.StyleImage source={{ uri: srcImage }} resizeMode="cover" />
    </TouchableOpacity>
  );
};
