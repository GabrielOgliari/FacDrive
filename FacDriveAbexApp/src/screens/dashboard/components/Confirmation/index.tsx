import { useState } from 'react';
import { useMutation } from 'react-query';
import { Text } from '../../../../components/UI/atoms/Text';
import dashboardService from '../../../../services/dashboard/dashboard-service';
import { Container } from '../Container';
import * as S from './styles';

type ConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

// TODO: Fazer conexão com API, no sucesso dela, esconder os botões
// e exibir o status adequado. Usar loading enquanto aguarda.

export const Confirmation = ({ onConfirm, onCancel }: ConfirmationProps) => {
  const [status, setStatus] = useState(false);

  const { mutateAsync, isSuccess, isError } = useMutation({
    mutationFn: ({ confirmation }: { confirmation: boolean }) =>
      dashboardService.confirmRide({ confirmation }),
  });

  const isShowConfirmedStatus = isSuccess && !status;
  const isShowCanceledStatus = isSuccess && status;

  const handleStatus = (status: boolean) => {
    mutateAsync({ confirmation: status });
    setStatus(status);
  };

  return (
    <Container>
      <Text>
        Lembre-se de confirmar sua carona para casa. Confirmar agora? 🏠
      </Text>

      <Text type="light">Seu motorista: Gabriel Ogliari Roncato</Text>

      <S.Flex>
        <S.ConfirmButton onPress={onConfirm}>
          <S.TextButton onPress={() => handleStatus(true)}>
            Confirmar
          </S.TextButton>
        </S.ConfirmButton>
        <S.CancelButton onPress={onCancel}>
          <S.TextButton onPress={() => handleStatus(false)}>
            Cancelar
          </S.TextButton>
        </S.CancelButton>
      </S.Flex>

      {isShowConfirmedStatus && (
        <S.GreenContainer>
          <S.Text>Você confirmou a carona</S.Text>
        </S.GreenContainer>
      )}

      {isShowCanceledStatus && (
        <S.RedContainer>
          <S.Text>Você cancelou a carona</S.Text>
        </S.RedContainer>
      )}

      {isError && (
        <S.RedContainer>
          <S.Text>
            Erro ao {status ? 'confirmar' : 'cancelar'} carona. Por favor,
            aguarde alguns minutos e tente novamente.
          </S.Text>
        </S.RedContainer>
      )}
    </Container>
  );
};
