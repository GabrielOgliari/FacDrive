import Icon from 'react-native-vector-icons/Ionicons';
import * as S from './styles';

interface UserProps {
    driverName: string;
    riderName: string;
    amount: string;
}

export const User = ({ driverName, riderName, amount }: UserProps) => {
    return (
        <S.Body>
            <S.RiderView>
                <S.Title>Caroneiro</S.Title>
                <S.Text>{riderName}</S.Text>
            </S.RiderView>

            <S.CenterView>
                <S.Text style={{ marginRight: 5 }}>{amount}</S.Text>
                <Icon name="caret-back-sharp" size={20} color="#B23B3B" style={{ transform: [{ rotate: '180deg' }] }} />
            </S.CenterView>

            <S.DriverView>
                <S.Title>Motorista</S.Title>
                <S.Text>{driverName}</S.Text>
            </S.DriverView>
        </S.Body>
    );
};
