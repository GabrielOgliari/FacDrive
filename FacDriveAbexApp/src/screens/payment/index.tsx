import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components/native';
import { MainTemplate } from '../../components/templates/Main';
import { Loader } from '../../components/UI/atoms/Loader';
import { Text } from '../../components/UI/atoms/Text';
import { useUser } from '../../context/useUser';
import { dispatchToast } from '../../helpers/dispatchToast';
import paymentService from '../../services/payment/payment-service';
import { Card } from './components/Card';

export const PaymentScreen = () => {
  const { user } = useUser();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['get-payment-history', user.id],
    queryFn: () => paymentService.getPaymentHistory(user.id),
    onError: () =>
      dispatchToast({ title: 'Erro ao carregar histórico!', type: 'error' }),
  });

  const hasPayments = data && Array.isArray(data) && data.length >= 1;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  const setPaymentStatusMutation = useMutation({
    mutationFn: (statusId: number) => paymentService.setPaymentStatus(statusId),
    onSuccess: () => {
      dispatchToast({ title: 'Confirmação de pagamento realizada!' });
      refetch();
    },
    onError: () =>
      dispatchToast({ title: 'Erro ao alterar status!', type: 'error' }),
  });

  return (
    <MainTemplate title="Pagamentos">
      {(isLoading || isFetching || setPaymentStatusMutation.isLoading) && (
        <Loader />
      )}

      {!hasPayments ? (
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Text>Não existem pagamentos pendentes</Text>
        </View>
      ) : (
        <History
          data={data}
          renderItem={({ item }) => (
            <Card
              key={item.id}
              name={item.name}
              amount={item.amount}
              image={item.image}
              onStatus={() => setPaymentStatusMutation.mutate(item.id)}
            />
          )}
        />
      )}
    </MainTemplate>
  );
};

export const History = styled.FlatList`
  width: 100%;
  padding: 10px;
`;
