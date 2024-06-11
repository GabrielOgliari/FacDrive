import React, {useState} from 'react';
import {HomeContainer} from './styles.ts';
import {CustomButton} from '../../components/CustomButton';
import {CustomInput} from '../../components/CustomInput';
import {LoadingCar} from '../../components/LoadingCar';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <HomeContainer>
      <CustomButton
        backGroundColor={'#002039'}
        label={'Login'}
        labelColor={'white'}
        onPress={() => {}}
      />
      <CustomInput
        value={name}
        onChangeText={setName}
        placeHolder={'Nome Completo'}
      />
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
      <LoadingCar iniciaLeft={0} finalLeft={100} />
    </HomeContainer>
  );
};

export {Home};
