import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { MainTemplate } from '../../../components/templates/Main';
import { Button } from '../../../components/UI/atoms/Button';
import { ProgressCar } from '../../../components/UI/atoms/ProgressCar';
import { Fields } from '../../../components/UI/organisms/Fields/root';
import { GenderOptions } from '../../../constants/gender-options';
import { useFormStateContext } from '../../../context/useFormStateContext';
import { GenderEnum } from '../../../enums/gender-enum';
import { dispatchToast } from '../../../helpers/dispatchToast';
import { useForm } from '../../../hooks/useForm';
import signUpService from '../../../services/sign-up/sign-up-service';
import { ValidStudentIdResponse } from '../../../services/sign-up/types/valid-student-id';
import { width } from '../../../utils/dimensions';
import { isEmpty } from '../../../utils/validators/isEmpty';
import { isValidCpf } from '../../../utils/validators/isValidCpf';

export type PersonalDetailsForm = {
  name: string;
  surname: string;
  birthDate: Date;
  driverLicense: string;
  gender: GenderEnum;
  cpf: string;
  phone: string;
};

export const PersonalDetailsScreen = () => {
  const { setObject, getObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const { isDriver } = getObject<{ isDriver: boolean }>('user-type');

  const { object, register, applyValidations, watch } =
    useForm<PersonalDetailsForm>({
      validations: {
        name: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Nome.';
        },
        cpf: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu CPF.';
          if (isValidCpf('132.291.791-18'))
            return 'Por favor, insira um CPF válido.';
        },
        birthDate: value => {
          if (isEmpty(value))
            return 'Por favor, insira a sua Data de Nascimento.';
        },
      },
    });

  const verifyCpfAlreadyRegisteredMutation = useMutation({
    mutationFn: (cpf: string) => signUpService.verifyCpfAlreadyRegistered(cpf),

    onError: () => {
      dispatchToast({
        title: 'Erro ao verificar CPF já cadastrado.',
        type: 'error',
      });
    },
  });

  const handlePressRegisterButton = () => {
    if (applyValidations()) {
      const { cpf } = getObject<ValidStudentIdResponse>('student-id');

      if (watch('cpf') !== cpf) {
        dispatchToast({
          title: 'O CPF não corresponde ao da Universidade.',
          type: 'error',
        });
        return;
      }

      verifyCpfAlreadyRegisteredMutation
        .mutateAsync(watch('cpf') as string)
        .then(cpfAlreadyRegistered => {
          if (cpfAlreadyRegistered) {
            dispatchToast({
              title: 'CPF já cadastrado.',
              description: 'Você não pode utilizar esse CPF.',
              type: 'error',
            });
            return;
          }

          setObject('personal-details', object);
          navigate('address');
        });
    }
  };

  return (
    <MainTemplate title="Dados Pessoais">
      <View style={{ gap: width * 0.08 }}>
        <Fields.Input {...register('name')} placeholder="Nome" />

        <Fields.Input {...register('surname')} placeholder="Sobrenome" />

        <Fields.Input
          {...register('cpf')}
          placeholder="CPF"
          keyboard="numeric"
        />

        {/* Deve ser campo Data */}
        <Fields.Input
          {...register('birthDate')}
          placeholder="Data de Nascimento"
          keyboard="numeric"
        />

        <Fields.Input
          {...register('driverLicense')}
          placeholder="Carteira de Motorista"
          keyboard="numeric"
          hidden={!isDriver}
        />

        <Fields.Dropdown
          {...register('gender')}
          placeholder="Gênero"
          options={GenderOptions}
        />

        <Fields.Input
          {...register('phone')}
          placeholder="Telefone"
          keyboard="numeric"
        />
      </View>

      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={3} totalSteps={5} />

        <Button
          backgroundColor="#4ccbf8"
          label="Cadastrar"
          labelColor="black"
          onPress={handlePressRegisterButton}
        />
      </View>
    </MainTemplate>
  );
};
