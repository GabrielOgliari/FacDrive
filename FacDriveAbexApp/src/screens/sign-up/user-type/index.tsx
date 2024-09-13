import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { MainTemplate } from '../../../components/templates/Main';
import { Button } from '../../../components/UI/atoms/Button';
import { ProgressCar } from '../../../components/UI/atoms/ProgressCar';
import { useFormStateContext } from '../../../context/useFormStateContext';
import { height, width } from '../../../utils/dimensions';

export const UserTypeScreen = () => {
  const { setObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const [isDriver, setIsDriver] = useState(false);

  const handlePressContinueButton = () => {
    setObject('user-type', { isDriver });
    navigate('student-id');
  };

  return (
    <MainTemplate title="Tipo de Usuário">
      <View style={{ gap: width * 0.08 }}>
        <ButtonStylized
          $selected={!isDriver}
          onPress={() => setIsDriver(false)}
        >
          <ButtonText>Passageiro</ButtonText>
        </ButtonStylized>

        <ButtonStylized $selected={isDriver} onPress={() => setIsDriver(true)}>
          <ButtonText>Motorista</ButtonText>
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
    </MainTemplate>
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
