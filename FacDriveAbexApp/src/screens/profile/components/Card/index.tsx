import * as S from './styles';

type Data = {
    name: string;
    role: string;
};

export const Card = ({ name, role }: Data) => {
    return (
        <S.Body>
            <S.RowBox>
                <S.Item style={{ fontWeight: 'light' }}>{name}</S.Item>
                <S.Item
                    style={{
                        paddingLeft: 15,
                        borderLeftWidth: 1,
                        borderColor: 'white',
                    }}
                >
                    {role}
                </S.Item>
            </S.RowBox>
        </S.Body>
    );
};
