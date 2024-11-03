import { useUser } from '../../../../context/useUser';
import { formatCurrency } from '../../../../utils/formatters/currency';
import * as S from './styles';

export type CardProps = {
    name: string;
    amount: string;
    image: string;
    onStatus: () => void;
};

export const Card = ({ name, amount, image, onStatus }: CardProps) => {
    const { user } = useUser();

    return (
        <S.Card>
            <S.Image src={`data:image/png;base64,${image}`} />

            <S.Container>
                <S.Wrapper>
                    <S.Group>
                        <S.Label>Passageiro(a)</S.Label>
                        <S.Text>{name}</S.Text>
                    </S.Group>

                    <S.Group>
                        <S.Label>Valor da Corrida</S.Label>
                        <S.Text>{formatCurrency(Number(amount))}</S.Text>
                    </S.Group>
                </S.Wrapper>

                {user.isDriver && (
                    <S.Button onPress={onStatus}>
                        <S.TextButton>Marcar como Pago</S.TextButton>
                    </S.Button>
                )}
            </S.Container>
        </S.Card>
    );
};
