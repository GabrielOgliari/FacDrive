import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

type Data = {
    title: string;
    content: string;
    icon: string;
};

export const Item = ({ title, content, icon }: Data) => {
    return (
        <S.Body>
            <S.RowBox>
                <Icon
                    name={icon}
                    size={20}
                    color="rgb(0, 0, 0)"
                    style={{ marginRight: 10 }}
                />
                <S.Title>{title}</S.Title>
                <S.Content>- {content}</S.Content>
            </S.RowBox>
        </S.Body>
    );
};
