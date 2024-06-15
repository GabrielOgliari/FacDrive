import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import addressService from '../../core/services/sign-up/address-service.ts';
import { AddressResponse } from '../../core/services/sign-up/types/address.ts';
import { useForm } from '../../hooks/useForm.ts';
import { isEmpty } from '../../utils/validators/isEmpty.ts';
import * as Styles from './styles.ts';

type AddressForm = {
  zipCode: string;
  state: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  street: string;
};

export const AddressScreen = () => {
  const { navigate } = useNavigation();

  const { register, watch, applyValidations, setValue } = useForm<AddressForm>({
    validations: {
      zipCode: value => {
        if (isEmpty(value)) return 'Por favor, insira o seu CEP.';
        // Antes de validar o CEP, precisa criar uma mascára para ele, pois ele já valida
        // com o hífen.
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

  const getAddressByCepMutation = useMutation({
    mutationFn: () => addressService.getAddressByCep(watch('cep') as string),
    onSuccess: (data: AddressResponse) => {
      setValue('street', data.street);
      setValue('neighborhood', data.neighborhood);
      setValue('city', data.city);
      setValue('state', data.state);
    },
  });

  useEffect(() => {
    const isCompleteCep = String(watch('cep')).length === 8;

    if (isCompleteCep) {
      getAddressByCepMutation.mutateAsync();
    }
  }, [watch('cep')]);

  const handleClickContinueButton = () => {
    if (applyValidations()) {
      navigate('vehicle');
    }
  };

  return (
    <Styles.SignUpContainer>
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      >
        <Styles.ScreenLabel>
          Prosseguindo com o{'\n'}cadastro
        </Styles.ScreenLabel>

        <Styles.InputsView>
          <Input
            {...register('zipCode')}
            placeholder="CEP ex: 12345-678"
            keyboardType="numeric"
          />

          <Styles.HalfInputView>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Input
                {...register('state')}
                placeholder="Estado"
                blocked={true}
                halfInput={true}
              />
              <Input
                {...register('city')}
                placeholder="Cidade"
                blocked={true}
                halfInput={true}
              />
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Input
                {...register('neighborhood')}
                placeholder="Bairro"
                halfInput={true}
              />

              <Input
                {...register('number')}
                placeholder="N° Residência"
                halfInput={true}
              />
            </View>
          </Styles.HalfInputView>

          <Input {...register('street')} placeholder="Bairro" />

          <Input
            {...register('complement')}
            placeholder="Complemento (opcional)"
          />
        </Styles.InputsView>

        <LoadingCar iniciaLeft={170} finalLeft={230} />

        <Button
          backGroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handleClickContinueButton}
        />
      </Styles.ScrollViewContainer>
    </Styles.SignUpContainer>
  );
};
