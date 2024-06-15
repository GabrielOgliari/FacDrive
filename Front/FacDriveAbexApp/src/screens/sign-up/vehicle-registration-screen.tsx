import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Button } from '../../components/Button/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import { VehicleResponse } from '../../core/services/sign-up/types/vehicle.ts';
import vehicleService from '../../core/services/sign-up/vehicle-service.ts';
import { useForm } from '../../hooks/useForm.ts';
import { isEmpty } from '../../utils/validators/isEmpty.ts';
import { isValidPlate } from '../../utils/validators/isValidPlate.ts';
import * as Styles from './styles.ts';

export type VehicleForm = {
  plate: string;
  color: string;
  manufacturingYear: number;
  modelYear: number;
  city: string;
  state: string;
};

export const VehicleScreen = () => {
  const { register, applyValidations, watch, setValue } = useForm<VehicleForm>({
    validations: {
      plate: value => {
        if (isEmpty(value)) return 'Por favor, insira o campo Placa.';
        if (!isValidPlate(value)) return 'A Placa informada não é válida.';
      },
      color: value => {
        if (isEmpty(value)) return 'Por favor, insira o campo Cor.';
      },
      manufacturingYear: value => {
        if (isEmpty(value)) return 'Por favor, insira o campo Ano Fabricação.';
      },
      modelYear: value => {
        if (isEmpty(value)) return 'Por favor, insira o campo Ano Modelo.';
        if (isValidYear(value, 1900, new Date().getFullYear()))
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

  useQuery({
    queryKey: ['vehicle', watch('plate')],
    queryFn: () => vehicleService.vehicleByPlate(String(watch('plate'))),
    onSuccess: (data: VehicleResponse) => {
      console.log('veio');

      setValue('color', data.color);
      setValue('manufacturingYear', data.manufacturingYear);
      setValue('modelYear', data.modelYear);
      setValue('city', data.city);
      setValue('state', data.state);
    },
    enabled: String(watch('plate')).length === 7,
  });

  const handleClickRegisterButton = () => {
    applyValidations();
  };

  useEffect(() => {
    console.log(watch('plate'));
  }, [String(watch('plate')).length]);

  return (
    <Styles.SignUpContainer>
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      >
        <Styles.ScreenLabel>
          Informe os dados{'\n'}do veículo
        </Styles.ScreenLabel>

        <Styles.InputsView>
          <Input placeholder="Placa" {...register('plate')} />

          <Input placeholder="Cor" {...register('color')} />

          <Input
            placeholder="Ano Fabricação"
            {...register('manufacturingYear')}
          />

          <Input placeholder="Ano Modelo" {...register('modelYear')} />

          <Input placeholder="Cidade" {...register('city')} />

          <Input placeholder="Estado" {...register('state')} />
        </Styles.InputsView>

        <LoadingCar iniciaLeft={0} finalLeft={230} />

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
