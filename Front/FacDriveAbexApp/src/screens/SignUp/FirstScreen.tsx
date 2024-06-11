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

const FirstScreen: React.FC = () => {
  const navigation = useNavigation();
  const navigateToSignUp = () => {
    navigation.navigate('SecundScreen');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <SignUpContainer>
      <ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}>
        <ScreenLabel>Vamos começar o{'\n'}seu cadastro</ScreenLabel>
        <InputsView>
          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeHolder={'Email Institucional'}
          />
          <CustomInput
            value={password}
            onChangeText={setPassword}
            placeHolder={'Senha'}
            isPassword={true}
          />
          <CustomInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeHolder={'Confirmar Senha'}
            isPassword={true}
          />
        </InputsView>
        <LoadingCar iniciaLeft={0} finalLeft={0} />
        <CustomButton
          backGroundColor={'#4ccbf8'}
          label={'Continuar'}
          labelColor={'black'}
          onPress={navigateToSignUp}
        />
      </ScrollViewContainer>
    </SignUpContainer>
  );
};

export {FirstScreen};
