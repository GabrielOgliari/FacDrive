import Icon from 'react-native-vector-icons/AntDesign';

import * as S from './styles';

type ChargeButtonProps = {
  onCharge: () => void;
};

export const ChargeButton = ({ onCharge }: ChargeButtonProps) => {
  return (
    <S.ChargeButton onPress={onCharge}>
      <Icon name="car" size={22} color="#fff" />
    </S.ChargeButton>
  );
};
