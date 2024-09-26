import { BackButton } from './components/BackButton';
import { User } from './components/User';
import * as S from './styles';

type UsersFetch = Array<{driver:string, rider: string, amount: string}>

export const Relations = () => {
    const getUsers = (): UsersFetch => {
        return [
            {
                driver: 'Matheus',
                rider: 'Lucas',
                amount: '10R$',
            },
            {
                driver: 'Jorge',
                rider: 'Jacó',
                amount: '20R$',
            },
        ];
    };

    return (
        <S.Body>
            <S.Content>
                <S.Header>
                    <BackButton />
                    <S.Title>Relacionamentos</S.Title>
                </S.Header>
                {getUsers().map((item) => {
                    return <User driverName={item.driver} riderName={item.rider} amount={item.amount} />
                })}
            </S.Content>
        </S.Body>
    );
};
