import Icon from 'react-native-vector-icons/AntDesign';

import * as S from './styles';

type LogoutButtonProps = {
  onLogout: () => void;
};

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <S.LogoutButton onPress={onLogout}>
      <S.TextButton>Sair da Conta</S.TextButton>
      <Icon name="logout" size={22} color="#fff" />
    </S.LogoutButton>
  );
};
