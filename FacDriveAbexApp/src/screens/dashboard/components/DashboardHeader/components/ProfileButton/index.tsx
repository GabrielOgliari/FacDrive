import { TouchableOpacity } from 'react-native';
import * as S from './styles';

type ProfileButtonProps = {
  onProfile: () => void;
};

export const ProfileButton = ({ onProfile }: ProfileButtonProps) => {
  return (
    <TouchableOpacity onPress={onProfile}>
      <S.StyleImage
        source={{
          uri: 'https://avatars.githubusercontent.com/u/135643864?v=4',
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};
