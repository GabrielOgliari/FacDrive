import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Loader } from '../../../../components/UI/atoms/Loader';
import { Text } from '../../../../components/UI/atoms/Text';
import { DaysOfTheWeek } from '../../../../enums/days-of-the-week';
import { dispatchToast } from '../../../../helpers/dispatchToast';
import { useUser } from '../../../../hooks/useUser';
import dashboardService from '../../../../services/dashboard/dashboard-service';
import { Container } from '../Container';
import * as S from './styles';

export const CarpoolDays = () => {
  const [isCreate, setIsCreate] = useState(false);

  const { userId } = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['get-carpool-days'],
    queryFn: () => dashboardService.getCarpoolDays(Number(userId)),
    onError: () => {
      dispatchToast({
        title: 'Erro ao obter dias de carona.',
        type: 'error',
      });

      setIsCreate(true);
    },
  });

  const createCarpoolDaysMutation = useMutation({
    mutationFn: (day: DaysOfTheWeek) =>
      dashboardService.createCarpoolDays({ id: Number(userId), day }),
    onError: () =>
      dispatchToast({
        title: 'Erro ao atualizar dias de carona.',
        type: 'error',
      }),
    onSuccess: () => refetch(),
  });

  const updateCarpoolDaysMutation = useMutation({
    mutationFn: (day: DaysOfTheWeek) =>
      dashboardService.updateCarpoolDays({ id: Number(userId), day }),
    onError: () =>
      dispatchToast({
        title: 'Erro ao atualizar dias de carona.',
        type: 'error',
      }),
    onSuccess: () => refetch(),
  });

  const setCarpoolDays = (value: DaysOfTheWeek) => {
    if (isCreate) {
      createCarpoolDaysMutation.mutate(value);
    }
    updateCarpoolDaysMutation.mutate(value);
  };

  return (
    <>
      {(isLoading ||
        createCarpoolDaysMutation.isLoading ||
        updateCarpoolDaysMutation.isLoading) && <Loader />}

      <Container>
        <Text type="text">Esses são os seus dias de carona 😊</Text>
        <Text type="light">
          Para alterar, clique nos dias que deseja marcar
        </Text>

        <S.Days>
          {data?.map(({ day, active, value }) => {
            return (
              <S.DayItem
                key={day}
                $isActive={active}
                onPress={() => setCarpoolDays(value)}
              >
                <S.DayText $isActive={active}>{day}</S.DayText>
              </S.DayItem>
            );
          })}
        </S.Days>
      </Container>
    </>
  );
};
