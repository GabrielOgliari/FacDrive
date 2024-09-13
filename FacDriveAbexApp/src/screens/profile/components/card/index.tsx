import { Text } from 'react-native';
import * as S from './styles';

type Data = {
    name: string;
    role: string;
    address: string;
};

export const Card = ({ name, role, address }: Data) => {
    return (
        <S.Body>
            <S.RowBox>
                <S.Item style={{fontWeight: "bold"}}>{name}</S.Item>
                <S.Item>{role}</S.Item>
                <S.Item>{address}</S.Item>
            </S.RowBox>
        </S.Body>
    );
};
