import { BackButton } from './components/BackButton';
import { User } from './components/User';
import * as S from './styles';

export const Relations = () => {
    return (
        <S.Body>
            <S.Header>
                <BackButton />
                <S.Title>Relacionamentos</S.Title>
            </S.Header>
            <User />
        </S.Body>
    );
};
