import { formatCurrency } from '../../../../utils/formatters/currency';
import * as S from './styles';

export type CardProps = {
  passengerName: string;
  costRide: number;
  image: string;
  isPaid: boolean;
  onStatus: () => void;
};

export const Card = ({
  passengerName,
  costRide,
  image,
  isPaid,
  onStatus,
}: CardProps) => {
  return (
    <S.Card>
      <S.Image src={image} />

      <S.Container>
        <S.Wrapper>
          <S.Group>
            <S.Label>Passageiro(a)</S.Label>
            <S.Text>{passengerName}</S.Text>
          </S.Group>

          <S.Group>
            <S.Label>Valor da Corrida</S.Label>
            <S.Text>{formatCurrency(costRide)}</S.Text>
          </S.Group>
        </S.Wrapper>

        <S.Button onPress={onStatus} $isPaid={isPaid}>
          <S.TextButton>
            {isPaid ? 'Marcar como Pago' : 'Desmarcar como Pago'}
          </S.TextButton>
        </S.Button>
      </S.Container>
    </S.Card>
  );
};
