import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { useFormStateContext } from '../../context/useFormStateContext';
import { dispatchToast } from '../../helpers/dispatchToast';
import { height, width } from '../../utils/dimensions';
import { ProgressCar } from './components/ProgressCar';
import { UserTypeEnum } from './enums/user-type-enum';

export const UserType = () => {
  const { setObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const [selected, setSelected] = useState<UserTypeEnum | null>(null);

  const handlePressContinueButton = () => {
    if (selected === null) {
      dispatchToast('Você precisa selecionar um tipo');
      return;
    }

    setObject('USER_TYPE', { userType: selected });
    navigate('STUDENT_ID');
  };

  return (
    <Container title="Tipo de Usuário">
      <View style={{ gap: width * 0.08 }}>
        <ButtonStylized
          $selected={selected === UserTypeEnum.driver}
          onPress={() => setSelected(UserTypeEnum.driver)}
        >
          <ButtonText>Motorista</ButtonText>
        </ButtonStylized>

        <ButtonStylized
          $selected={selected === UserTypeEnum.passenger}
          onPress={() => setSelected(UserTypeEnum.passenger)}
        >
          <ButtonText>Passageiro</ButtonText>
        </ButtonStylized>
      </View>

      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={1} totalSteps={5} />

        <Button
          backgroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handlePressContinueButton}
        />
      </View>
    </Container>
  );
};

const ButtonStylized = styled.TouchableOpacity<{ $selected: boolean }>`
  justify-content: center;

  width: ${width * 0.9}px;
  height: ${height * 0.16}px;

  border-radius: 22px;

  border-color: ${({ $selected }) => {
    if ($selected) return '#4ccbf8';
    return '#ccc';
  }};

  border-width: ${({ $selected }) => {
    if ($selected) return '2px';
    return '1px';
  }};
`;

const ButtonText = styled.Text`
  color: black;
  font-size: ${height * 0.03}px;
  padding-left: 10px;
  text-align: center;
`;
