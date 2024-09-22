import { useQuery } from 'react-query';
import { Text } from '../../../../components/UI/atoms/Text';
import dashboardService from '../../../../services/dashboard/dashboard-service';
import { Container } from '../Container';

// TODO: Lista mockada, todos os valores devem ser falsos!

const Days = [
  { day: 'Seg', active: false },
  { day: 'Ter', active: true },
  { day: 'Qua', active: true },
  { day: 'Qui', active: false },
  { day: 'Sex', active: true },
  { day: 'Sáb', active: false },
];

export const CarpoolDays = () => {
  const { data } = useQuery({
    queryKey: ['get-carpool-days'],
    queryFn: () => dashboardService.getCarpoolDays(0), // Deve mandar o ID do usuário
    initialData: Days,
  });

  return (
    <Container>
      <Text type="text">Esses são os seus dias de carona 😊</Text>

      {/* <S.Days>
        {data?.map(({ day, active }) => {
          return (
            <S.DayItem key={day} $isActive={active}>
              <S.DayText $isActive={active}>{day}</S.DayText>
            </S.DayItem>
          );
        })}
      </S.Days> */}
    </Container>
  );
};
