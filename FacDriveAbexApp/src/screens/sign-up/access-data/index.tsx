import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { MainTemplate } from '../../../components/templates/Main';
import { Button } from '../../../components/UI/atoms/Button';
import { Loader } from '../../../components/UI/atoms/Loader';
import { ProgressCar } from '../../../components/UI/atoms/ProgressCar';
import { Fields } from '../../../components/UI/organisms/Fields/root';
import { useFormStateContext } from '../../../context/useFormStateContext';
import { dispatchToast } from '../../../helpers/dispatchToast';
import { useForm } from '../../../hooks/useForm';
import signUpService from '../../../services/sign-up/sign-up-service';
import { width } from '../../../utils/dimensions';
import { isEmpty } from '../../../utils/validators/isEmpty';
import { isValidInstitutionalEmail } from '../../../utils/validators/isValidInstitutionalEmail';

export type AccessDataForm = {
  institutionalEmail: string;
  password: string;
  passwordConfirmation: string;
};

export const AccessDataScreen = () => {
  const { setObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const { object, register, applyValidations, watch } = useForm<AccessDataForm>(
    {
      validations: {
        institutionalEmail: value => {
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
    },
  );

  const verifyEmailAlreadyRegisteredMutation = useMutation({
    mutationKey: [
      'verify-email-already-registered',
      watch('institutionalEmail'),
    ],
    mutationFn: () =>
      signUpService.verifyEmailAlreadyRegistered(
        watch('institutionalEmail') as string,
      ),
  });

  const handlePressContinueButton = async () => {
    const isValidForm = applyValidations();

    if (!isValidForm) {
      dispatchToast({
        title: 'O formulário possui dados incorretos.',
        type: 'error',
      });
      return;
    }

    try {
      const { emailAlreadyRegistered } =
        await verifyEmailAlreadyRegisteredMutation.mutateAsync();

      if (emailAlreadyRegistered) {
        dispatchToast({
          title: 'E-mail já cadastrado.',
          description: 'Por favor insira outro e-mail.',
          type: 'error',
        });
        return;
      }

      setObject('access-data', {
        institutionalEmail: object.institutionalEmail,
        password: object.password,
      });
      navigate('user-type');
    } catch (error) {
      dispatchToast({
        title: 'Erro ao validar o e-mail.',
        type: 'error',
      });
    }
  };

  return (
    <MainTemplate title="Vamos Começar o Seu Cadastro">
      <Loader loading={verifyEmailAlreadyRegisteredMutation.isLoading} />

      <View style={{ gap: width * 0.08 }}>
        <Fields.Input
          placeholder="Email Institucional"
          {...register('institutionalEmail')}
        />

        <Fields.Input
          placeholder="Senha"
          mode="password"
          {...register('password')}
        />

        <Fields.Input
          placeholder="Confirmar Senha"
          readOnly={!watch('password')}
          mode="password"
          {...register('passwordConfirmation')}
        />
      </View>

      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={0} totalSteps={5} />

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
