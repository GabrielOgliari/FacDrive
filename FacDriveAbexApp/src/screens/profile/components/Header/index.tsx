import { SettingsButton } from './components/SettingsButton';
import { BackButton } from './components/BackButton';
import * as S from './styles';

export const Header = () => {
    return (
        <S.Body>
            <BackButton />
            <SettingsButton />
        </S.Body>
    );
};
