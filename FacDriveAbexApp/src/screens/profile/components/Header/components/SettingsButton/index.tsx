import Icon from 'react-native-vector-icons/Ionicons';
import * as S from './styles';

export const SettingsButton = () => {
    return (
        <S.Body>
            <S.Button
                onPress={() => {
                    // TODO Implement the navigation to the settings screen
                }}
            >
                <Icon name="settings" size={30} color="#0082c8" />
            </S.Button>
        </S.Body>
    );
};
