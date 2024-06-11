import React, {useState} from 'react';
import {
  SignUpContainer,
  ScreenLabel,
  InputsView,
  ScrollViewContainer,
} from './styles.ts';
import {CustomInput} from '../../components/CustomInput';
import {LoadingCar} from '../../components/LoadingCar';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const ThirdScreen: React.FC = () => {
  const navigation = useNavigation();
  const navigateToSignUp = () => {
    navigation.navigate('FourthScreen');
  };

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  return (
    <SignUpContainer>
      <ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}>
        <ScreenLabel>Informe seus dados{'\n'}pessoais</ScreenLabel>
        <InputsView>
          <CustomInput
            value={name}
            onChangeText={setName}
            placeHolder={'Nome completo'}
          />
          <CustomInput
            value={age}
            onChangeText={setAge}
            placeHolder={'Idade'}
            keyboardType={'numeric'}
          />
          <CustomInput
            value={cpf}
            onChangeText={setCpf}
            placeHolder={'CPF'}
            keyboardType={'numeric'}
          />
          <CustomInput
            value={birthDate}
            onChangeText={setBirthDate}
            placeHolder={'Data de nascimento'}
            keyboardType={'numeric'}
          />
        </InputsView>
        <LoadingCar iniciaLeft={100} finalLeft={170} />
        <CustomButton
          backGroundColor={'#4ccbf8'}
          label={'Cadastrar'}
          labelColor={'black'}
          onPress={navigateToSignUp}
        />
      </ScrollViewContainer>
    </SignUpContainer>
  );
};

export {ThirdScreen};
