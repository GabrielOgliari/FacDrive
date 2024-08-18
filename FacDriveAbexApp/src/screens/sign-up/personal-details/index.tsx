import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { Button } from '../../../components/UI/atoms/Button';
import { Container } from '../../../components/UI/atoms/Container';
import { ProgressCar } from '../../../components/UI/atoms/ProgressCar';
import { Fields } from '../../../components/UI/organisms/Fields/root';
import { GenderOptions } from '../../../constants/gender-options';
import { useFormStateContext } from '../../../context/useFormStateContext';
import { GenderEnum } from '../../../enums/gender-enum';
import { useForm } from '../../../hooks/useForm';
import signUpService from '../../../services/sign-up/sign-up-service';
import { SendValidationData } from '../../../services/sign-up/types/send-validation-data';
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

  const sendValidationDataMutation = useMutation({
    mutationFn: (data: SendValidationData) =>
      signUpService.sendValidationData(data),
    onError: error => console.error(error),
  });

  const handlePressRegisterButton = () => {
    if (applyValidations()) {
      const { birthDate, cpf, email, registration, status } =
        getObject<ValidStudentIdResponse>('student-id');

      sendValidationDataMutation.mutateAsync({
        studentId: {
          birthDate,
          cpf,
          email,
          registration,
          status,
        },
        personalDetails: {
          name: watch('name'),
          surname: watch('surname'),
          birthDate: watch('birthDate'),
          gender: watch('gender'),
          cpf: watch('cpf'),
          phone: watch('phone'),
        },
      });

      setObject('personal-details', object);
      navigate('address');
    }
  };

  return (
    <Container title="Dados Pessoais">
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
    </Container>
  );
};
