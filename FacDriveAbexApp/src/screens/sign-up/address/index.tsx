import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { MainTemplate } from '../../../components/templates/Main';
import { Button } from '../../../components/UI/atoms/Button';
import { Loader } from '../../../components/UI/atoms/Loader';
import { ProgressCar } from '../../../components/UI/atoms/ProgressCar';
import { Fields } from '../../../components/UI/organisms/Fields/root';
import { useFormStateContext } from '../../../context/useFormStateContext';
import { dispatchToast } from '../../../helpers/dispatchToast';
import { useForm } from '../../../hooks/useForm';
import signUpService from '../../../services/sign-up/sign-up-service';
import { AddressResponse } from '../../../services/sign-up/types/address';
import { SaveSignUpData } from '../../../services/sign-up/types/save-sign-up-data';
import { ValidStudentIdResponse } from '../../../services/sign-up/types/valid-student-id';
import { width } from '../../../utils/dimensions';
import { isEmpty } from '../../../utils/validators/isEmpty';
import { AccessDataForm } from '../access-data';
import { PersonalDetailsForm } from '../personal-details';

export type AddressForm = {
  zipCode: string;
  state: string;
  city: string;
  additionalInfo: string;
  referencePoint: string;
  neighborhood: string;
  number: string;
  street: string;
};

const QUANTITY_OF_DIGITS_ZIP_CODE = 8;

export const AddressScreen = () => {
  const { setObject, getObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const { object, register, watch, applyValidations, setValue } =
    useForm<AddressForm>({
      validations: {
        zipCode: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu CEP.';
          // if (!isValidZipCode(value)) return 'Por favor, insira um CEP válido.';
        },
        state: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Estado.';
        },
        city: value => {
          if (isEmpty(value)) return 'Por favor, insira a sua Cidade.';
        },
        neighborhood: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Bairro.';
        },
        number: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu Nº Residência.';
        },
        street: value => {
          if (isEmpty(value)) return 'Por favor, insira a sua Rua.';
        },
      },
    });

  const getAddressByZipCodeQuery = useQuery({
    queryKey: ['get-address-by-zipCode', watch('zipCode')],
    queryFn: () => signUpService.getAddressByZipCode(String(watch('zipCode'))),
    onSuccess: (data: AddressResponse) => {
      setValue('street', data.street);
      setValue('neighborhood', data.neighborhood);
      setValue('city', data.city);
      setValue('state', data.state);
    },
    enabled: String(watch('zipCode')).length === QUANTITY_OF_DIGITS_ZIP_CODE,
  });

  const saveMutation = useMutation(
    (data: SaveSignUpData) => signUpService.save(data),
    {
      onError: () => {
        dispatchToast({
          title: 'Erro ao salvar os dados!',
          description: 'Por favor, tente novamente mais tarde!',
          type: 'error',
        });
      },
      onSuccess: () => {
        dispatchToast({
          title: 'Cadastro realizado com sucesso!',
          description: 'Faça login para usar o app.',
        });
        navigate('login');
      },
    },
  );

  const handlePressContinueButton = () => {
    if (applyValidations()) {
      const { isDriver } = getObject<{ isDriver: boolean }>('user-type');

      if (isDriver) {
        setObject('address', object);
        navigate('vehicle');
        return;
      }

      const userObject = {
        ...getObject<AccessDataForm>('access-data'),
        ...getObject<PersonalDetailsForm>('personal-details'),
        ...getObject<ValidStudentIdResponse>('student-id'),
        ...getObject<{ isDriver: boolean }>('user-type'),
      };

      // TODO: Corrigir 'birthDate', o campo deve ser Date e trazer a data correta

      saveMutation.mutateAsync({
        user: { ...userObject, birthDate: '2004-04-12T03:00:00.000Z' },
        address: object,
      });
    }
  };

  return (
    <MainTemplate title="Dados de Endereço">
      <Loader loading={getAddressByZipCodeQuery.isLoading} />

      <View style={{ gap: width * 0.08 }}>
        <Fields.Input
          placeholder="CEP ex: 12345-678"
          keyboard="numeric"
          {...register('zipCode')}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Fields.Input
            placeholder="Estado"
            size="sm"
            blocked
            {...register('state')}
          />

          <Fields.Input
            placeholder="Cidade"
            size="sm"
            blocked
            {...register('city')}
          />
        </View>

        <View style={{ gap: width * 0.08 }}>
          <Fields.Input placeholder="Bairro" {...register('neighborhood')} />

          <Fields.Input placeholder="Rua" {...register('street')} />

          <Fields.Input placeholder="N° Residência" {...register('number')} />
        </View>

        <Fields.Input placeholder="Bairro" {...register('neighborhood')} />

        <Fields.Input
          placeholder="Ponto de Referência (opcional)"
          {...register('referencePoint')}
        />

        <Fields.Input
          placeholder="Complemento (opcional)"
          {...register('additionalInfo')}
        />
      </View>
      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={4} totalSteps={5} />

        <Button
          disabled={saveMutation.isLoading}
          backgroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handlePressContinueButton}
        />
      </View>
    </MainTemplate>
  );
};
