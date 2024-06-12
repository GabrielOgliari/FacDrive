import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import { useForm } from '../../hooks/useForm.ts';
import { isEmpty } from '../../utils/validators/isEmpty.ts';
import { isValidInstitutionalEmail } from '../../utils/validators/isValidInstitutionalEmail.ts';
import * as Styles from './styles';

type EmailAndPasswordRegistrationForm = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const EmailAndPasswordRegistrationScreen = () => {
  const { navigate } = useNavigation();

  const { register, applyValidations, watch } =
    useForm<EmailAndPasswordRegistrationForm>({
      validations: {
        email: value => {
          if (isEmpty(value))
            return 'Por favor, insira o seu e-mail institucional.';
          if (!isValidInstitutionalEmail(value))
            return 'Por favor, insira um e-mail institucional válido.';
        },
        password: value => {
          if (isEmpty(value)) return 'Por favor, insira a sua senha.';
        },
        passwordConfirmation: value => {
          if (isEmpty(value))
            return 'Por favor, insira a sua senha de confirmação.';
          if (watch('password') !== watch('passwordConfirmation'))
            return 'As senhas devem ser iguais.';
        },
      },
    });

  const handleClickContiueButton = () => {
    if (applyValidations()) {
      navigate('AddressRegistration');
    }
  };

  return (
    <Styles.SignUpContainer>
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      >
        <Styles.ScreenLabel>
          Vamos começar o{'\n'}seu cadastro
        </Styles.ScreenLabel>

        <Styles.InputsView>
          <Input placeholder="Email Institucional" {...register('email')} />

          <Input placeholder="Senha" {...register('password')} isPassword />

          <Input
            placeholder="Confirmar Senha"
            readOnly={!watch('password')}
            {...register('passwordConfirmation')}
            isPassword
          />
        </Styles.InputsView>

        <LoadingCar iniciaLeft={0} finalLeft={0} />

        <Button
          backGroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handleClickContiueButton}
        />
      </Styles.ScrollViewContainer>
    </Styles.SignUpContainer>
  );
};
