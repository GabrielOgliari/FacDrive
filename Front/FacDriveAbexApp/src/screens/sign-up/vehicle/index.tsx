import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { Button } from '../../../components/UI/atoms/Button';
import { Container } from '../../../components/UI/atoms/Container';
import { FullScreenLoader } from '../../../components/UI/atoms/FullScreenLoader';
import { ProgressCar } from '../../../components/UI/atoms/ProgressCar';
import { Fields } from '../../../components/UI/organisms/Fields/root';
import { useFormStateContext } from '../../../context/useFormStateContext';
import { dispatchToast } from '../../../helpers/dispatchToast';
import { useForm } from '../../../hooks/useForm';
import signUpService from '../../../services/sign-up/sign-up-service';
import { SaveSignUpData } from '../../../services/sign-up/types/save-sign-up-data';
import { ValidStudentIdResponse } from '../../../services/sign-up/types/valid-student-id';
import { VehicleResponse } from '../../../services/sign-up/types/vehicle';
import { width } from '../../../utils/dimensions';
import { isEmpty } from '../../../utils/validators/isEmpty';
import { isValidYear } from '../../../utils/validators/isValidYear';
import { AccessDataForm } from '../access-data';
import { AddressForm } from '../address';
import { PersonalDetailsForm } from '../personal-details';

export type VehicleForm = {
  plate: string;
  color: string;
  manufacturingYear: string;
  modelYear: string;
  brand: string;
  model: string;
  city: string;
  state: string;
};

export const VehicleScreen = () => {
  const { navigate } = useNavigation();

  const [plateAlreadyRegistered, setPlateAlreadyRegistered] = useState(false);

  const { getObject } = useFormStateContext();

  const { object, register, applyValidations, watch, setValue } =
    useForm<VehicleForm>({
      validations: {
        plate: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Placa.';
        },
        color: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Cor.';
        },
        manufacturingYear: value => {
          if (isEmpty(value))
            return 'Por favor, insira o campo Ano de Fabricação.';
        },
        modelYear: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Ano Modelo.';
          if (!isValidYear(value, 1900, new Date().getFullYear()))
            return 'O ano informado não é válido.';
        },
        city: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Cidade.';
        },
        state: value => {
          if (isEmpty(value)) return 'Por favor, insira o campo Estado.';
        },
      },
    });

  const vehicleByPlateQuery = useQuery(
    ['vehicle', watch('plate')],
    () => signUpService.vehicleByPlate(watch('plate')),
    {
      onSuccess: (data: VehicleResponse) => {
        setValue('color', data.color);
        setValue('manufacturingYear', data.manufacturingYear);
        setValue('modelYear', data.modelYear);
        setValue('brand', data.brand);
        setValue('model', data.model);
        setValue('city', data.city);
        setValue('state', data.state);
      },
      enabled: String(watch('plate')).length === 7 && !plateAlreadyRegistered,
    },
  );

  const verifyVehicleHasAlreadyRegisteredQuery = useQuery(
    ['verify-plate', watch('plate')],
    () => signUpService.verifyVehicleHasAlreadyRegistered(watch('plate')),
    {
      onSuccess: ({ plateAlreadyRegistered }) => {
        setPlateAlreadyRegistered(plateAlreadyRegistered);

        if (plateAlreadyRegistered) {
          dispatchToast(
            'Placa já registrada. Você deve cadastrar outra placa.',
            { type: 'error' },
          );
        }
      },
      enabled: String(watch('plate')).length === 7,
    },
  );

  const saveMutation = useMutation(
    (data: SaveSignUpData) => signUpService.save(data),
    {
      onError: () => {
        dispatchToast(
          'Erro ao salvar os dados! Por favor, tente novamente mais tarde!',
          { type: 'error' },
        );
      },
      onSuccess: () => {
        dispatchToast(
          'Cadastro realizado com sucesso! Faça login para usar o app.',
        );
        navigate('login');
      },
    },
  );

  const handlePressRegisterButton = () => {
    applyValidations();

    const userObject = {
      ...getObject<AccessDataForm>('access-data'),
      ...getObject<PersonalDetailsForm>('personal-details'),
      ...getObject<ValidStudentIdResponse>('student-id'),
      ...getObject<{ isDriver: boolean }>('user-type'),
    };

    const addressObject = getObject<AddressForm>('address');

    // TODO: Corrigir 'birthDate', o campo deve ser Date e trazer a data correta

    if (!plateAlreadyRegistered) {
      saveMutation.mutateAsync({
        user: { ...userObject, birthDate: new Date() },
        address: addressObject,
        vehicle: object,
      });
    }
  };

  return (
    <Container title="Dados do Veículo">
      <FullScreenLoader
        loading={
          vehicleByPlateQuery.isLoading ||
          verifyVehicleHasAlreadyRegisteredQuery.isLoading
        }
      />

      <View style={{ gap: width * 0.08 }}>
        <Fields.Input placeholder="Placa" {...register('plate')} />

        <Fields.Input placeholder="Cor" {...register('color')} />

        <Fields.Input
          placeholder="Ano Fabricação"
          {...register('manufacturingYear')}
        />

        <Fields.Input placeholder="Ano Modelo" {...register('modelYear')} />

        <Fields.Input placeholder="Marca" {...register('brand')} />

        <Fields.Input placeholder="Modelo" {...register('model')} />

        <Fields.Input placeholder="Cidade" {...register('city')} />

        <Fields.Input placeholder="Estado" {...register('state')} />
      </View>
      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={5} totalSteps={5} />

        <Button
          disabled={saveMutation.isLoading}
          backgroundColor="#4ccbf8"
          label="Cadastrar"
          labelColor="black"
          onPress={handlePressRegisterButton}
        />
      </View>
    </Container>
  );
};
