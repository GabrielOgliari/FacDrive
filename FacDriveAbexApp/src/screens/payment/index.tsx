import React from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components/native';
import { MainTemplate } from '../../components/templates/Main';
import { Loader } from '../../components/UI/atoms/Loader';
import { dispatchToast } from '../../helpers/dispatchToast';
import paymentService from '../../services/payment/payment-service';
import { Card } from './components/Card';

const mockedData = [
  {
    id: 1,
    costRide: 20,
    image:
      'https://avatars.githubusercontent.com/u/135643864?s=400&u=b807b4c5afdbaf672873ad51ab57d5acab78ed70&v=4',
    passengerName: 'Rafael Kramer',
  },
  {
    id: 1,
    costRide: 20,
    image:
      'https://avatars.githubusercontent.com/u/135643864?s=400&u=b807b4c5afdbaf672873ad51ab57d5acab78ed70&v=4',
    passengerName: 'Rafael Kramer',
  },
];

export const PaymentScreen = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get-payment-history'],
    queryFn: (statusId: number) => paymentService.getPaymentHistory(statusId),
    onError: () =>
      dispatchToast({ title: 'Erro ao carregar histórico!', type: 'error' }),
    initialData: mockedData,
  });

  const setPaymentStatusMutation = useMutation({
    mutationFn: (statusId: number) => paymentService.setPaymentStatus(statusId),
    onSuccess: () =>
      dispatchToast({ title: 'Confirmação de pagamento realizada!' }),
    onError: () =>
      dispatchToast({ title: 'Erro ao alterar status!', type: 'error' }),
  });

  // const { data, isLoading } = useQuery({
  //   queryKey: ['test'],
  //   queryFn: async (statusId: number) => paymentService.getPaymentHistory(statusId),
  //   onError: () =>
  //     dispatchToast({ title: 'Erro ao carregar histórico!', type: 'error' }),
  //   initialData: mockedData,
  // });

  return (
    <MainTemplate title="Pagamentos">
      {(isLoading || setPaymentStatusMutation.isLoading) && <Loader />}

      <History
        data={data}
        renderItem={({ item }) => (
          <Card
            passengerName={item.passengerName}
            costRide={item.costRide}
            image={item.image}
            onStatus={() => setPaymentStatusMutation.mutate(item.id)}
          />
        )}
      />
    </MainTemplate>
  );
};

export const History = styled.FlatList`
  width: 100%;
  padding: 10px;
`;
