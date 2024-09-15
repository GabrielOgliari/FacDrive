import { SettingsButton } from './components/SettingsButton';
import { BackButton } from './components/BackButton';
import * as S from './styles';
import { View } from 'react-native';

export const Header = () => {
    return (
        <S.Body>
            <SettingsButton />
        </S.Body>
    );
};
