import { useNavigation } from '@react-navigation/native';
import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export const BackButton = () => {
    const {navigate} = useNavigation();

    return (
        <S.Body onPress={() => {navigate("dashboard")}}>
            <Icon
                name="arrow-back"
                size={40}
                color="#0082c8"
            />
        </S.Body>
    );
};
