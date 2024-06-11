import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import { useForm } from '../../hooks/useForm.ts';
import { isEmpty } from '../../utils/validators/isEmpty.ts';
import { isValidCpf } from '../../utils/validators/isValidCpf.ts';
import * as Styles from './styles.ts';

type PersonalDetailsRegistrationForm = {
  name: string;
  cpf: string;
  birthDate: Date;
};

export const PersonalDetailsRegistrationScreen = () => {
  const { navigate } = useNavigation();

  const { register, applyValidations } =
    useForm<PersonalDetailsRegistrationForm>({
      validations: {
        name: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Nome.';
        },
        cpf: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu CPF.';
          // A validação de CPF não está funcionando corretamente, verificar e corrigir
          if (isValidCpf(value)) return 'Por favor, insira um CPF válido.';
        },
        birthDate: value => {
          if (isEmpty(value))
            return 'Por favor, insira a sua Data de Nascimento.';
        },
      },
    });

  const handleClickRegisterButton = () => {
    if (applyValidations()) {
      navigate('StudentIdValidation');
    }
  };

  return (
    <Styles.SignUpContainer>
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      >
        <Styles.ScreenLabel>
          Informe seus dados{'\n'}pessoais
        </Styles.ScreenLabel>

        <Styles.InputsView>
          <Input {...register('name')} placeholder="Nome Completo" />

          <Input
            {...register('cpf')}
            placeholder="CPF"
            keyboardType="numeric"
          />

          {/* Deve ser campo Data */}
          <Input
            {...register('birthDate')}
            placeholder="Data de Nascimento"
            keyboardType="numeric"
          />
        </Styles.InputsView>

        <LoadingCar iniciaLeft={100} finalLeft={170} />

        <Button
          backGroundColor="#4ccbf8"
          label="Cadastrar"
          labelColor="black"
          onPress={handleClickRegisterButton}
        />
      </Styles.ScrollViewContainer>
    </Styles.SignUpContainer>
  );
};
