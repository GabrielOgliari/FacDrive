import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { HorisontalSeparator } from './components/HorisontalSeparator';

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
                    color="#0082c8"
                    style={{ marginRight: 10 }}
                />
                <S.Title>{title}</S.Title>
                <HorisontalSeparator space={8} />
                <S.Content>{content}</S.Content>
            </S.RowBox>
        </S.Body>
    );
};
