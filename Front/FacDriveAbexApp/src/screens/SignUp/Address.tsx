import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { FullScreenLoader } from '../../components/UI/atoms/FullScreenLoader';
import { Fields } from '../../components/UI/organisms/Fields/root';
import { useFormStateContext } from '../../context/useFormStateContext';
import { dispatchToast } from '../../helpers/dispatchToast';
import { useForm } from '../../hooks/useForm';
import signUpService from '../../services/sign-up/sign-up-service';
import { AddressResponse } from '../../services/sign-up/types/address';
import { width } from '../../utils/dimensions';
import { isEmpty } from '../../utils/validators/isEmpty';
import { ProgressCar } from './components/ProgressCar';
import { UserTypeEnum } from './enums/user-type-enum';

export type AddressForm = {
  zipCode: string;
  state: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  street: string;
};

const QUANTITY_OF_DIGITS_ZIP_CODE = 8;

export const Address = () => {
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

  const getAddressByCepQuery = useQuery({
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

  const handlePressContinueButton = () => {
    if (applyValidations()) {
      setObject('ADDRESS', object);

      const { userType } = getObject<{ userType: UserTypeEnum }>('USER_TYPE');

      if (userType === UserTypeEnum.driver) {
        navigate('VEHICLE');
      } else {
        dispatchToast('Cadastro Finalizado Para Estudante Do Tipo Passageiro');
      }
    }
  };

  return (
    <Container title="Dados de Endereço">
      <FullScreenLoader loading={getAddressByCepQuery.isLoading} />

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
          placeholder="Complemento (opcional)"
          {...register('complement')}
        />
      </View>
      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={4} totalSteps={5} />

        <Button
          backgroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handlePressContinueButton}
        />
      </View>
    </Container>
  );
};
