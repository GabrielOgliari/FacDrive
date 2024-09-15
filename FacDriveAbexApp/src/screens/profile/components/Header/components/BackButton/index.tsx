import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const BackButton = () => {
    const { navigate } = useNavigation();
    return (
        <S.Body>
            <S.Button
                onPress={() => {
                    navigate('dashboard');
                }}
            >
                <Icon name="arrow-back" size={30} color="#0082c8" />
            </S.Button>
        </S.Body>
    );
};
