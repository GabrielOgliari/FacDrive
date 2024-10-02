import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Loader } from '../../../../components/UI/atoms/Loader';
import { Text } from '../../../../components/UI/atoms/Text';
import { useUser } from '../../../../context/useUser';
import { DaysOfTheWeek } from '../../../../enums/days-of-the-week';
import { dispatchToast } from '../../../../helpers/dispatchToast';
import dashboardService from '../../../../services/dashboard/dashboard-service';
import { Days } from '../../../../services/dashboard/types/carpool-days-params';
import { Container } from '../Container';
import * as S from './styles';

export const CarpoolDays = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { user } = useUser();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['get-carpool-days'],
    queryFn: () => dashboardService.getCarpoolDays(user.id),
    onError: () => setIsCreate(true),
    initialData: [
      { day: 'Seg', active: false, value: DaysOfTheWeek.Monday },
      { day: 'Ter', active: false, value: DaysOfTheWeek.Tuesday },
      { day: 'Qua', active: false, value: DaysOfTheWeek.Wednesday },
      { day: 'Qui', active: false, value: DaysOfTheWeek.Thursday },
      { day: 'Sex', active: false, value: DaysOfTheWeek.Friday },
      { day: 'Sáb', active: false, value: DaysOfTheWeek.Saturday },
    ],
  });

  const createCarpoolDaysMutation = useMutation({
    mutationFn: (days: Days) =>
      dashboardService.createCarpoolDays({ id: user.id, days }),
    onError: () =>
      dispatchToast({
        title: 'Erro ao criar dias de carona.',
        type: 'error',
      }),
    onSuccess: () => refetch(),
  });

  const updateCarpoolDaysMutation = useMutation({
    mutationFn: (days: Days) =>
      dashboardService.updateCarpoolDays({ id: user.id, days }),
    onError: () =>
      dispatchToast({
        title: 'Erro ao atualizar dias de carona.',
        type: 'error',
      }),
    onSuccess: () => refetch(),
  });

  const setCarpoolDays = (value: DaysOfTheWeek) => {
    if (!data) return;

    const updatedData = data.map(item =>
      item.value === value ? { ...item, active: !item.active } : item,
    );

    if (isCreate) {
      createCarpoolDaysMutation.mutate(updatedData);
      setIsCreate(false);
    } else {
      updateCarpoolDaysMutation.mutate(updatedData);
    }
  };

  return (
    <>
      {(isLoading ||
        isFetching ||
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
