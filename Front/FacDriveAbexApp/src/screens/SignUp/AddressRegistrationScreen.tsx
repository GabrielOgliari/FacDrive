import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import { useForm } from '../../hooks/useForm.ts';
import { isEmpty } from '../../utils/validators/isEmpty.ts';
import * as Styles from './styles';

type AddressRegistrationForm = {
  zipCode: string;
  state: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  street: string;
};

export const AddressRegistrationScreen = () => {
  const { navigate } = useNavigation();

  const { register, watch, applyValidations, setState } =
    useForm<AddressRegistrationForm>({
      validations: {
        zipCode: value => {
          if (isEmpty(value)) return 'Por favor, insira o seu CEP.';
          // Antes de validar o CPF, precisa criar uma mascára para ele, pois ele já valida
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

  const handleClickContinueButton = () => {
    if (applyValidations()) {
      navigate('PersonalDetailsRegistration');
    }
  };

  useEffect(() => {
    if (watch('zipCode')?.length === 8) {
      const getCepInformation = async () => {
        let response = await fetch(
          `https://viacep.com.br/ws/${watch('zipCode')}/json/`,
        );
        response = await response.json();
        setState('city', response?.localidade);
        setState('state', response?.uf);
        setState('street', response.logradouro);
        setState('neighborhood', response.bairro);
      };

      getCepInformation();
    }
  }, [watch('zipCode')]);

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

        <LoadingCar iniciaLeft={0} finalLeft={100} />

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
