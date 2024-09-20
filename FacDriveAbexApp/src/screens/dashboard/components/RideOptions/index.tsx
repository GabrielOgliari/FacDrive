import { HorisontalSeparator } from '../../../../components/UI/atoms/HorisontalSeparator';
import * as S from './styles';

export const RideOptions = () => {
    return (
        <S.Body>
            <S.User>
                <S.Username>Matheus</S.Username>
                <HorisontalSeparator space={10} />

                <S.CommunDays>1 dia</S.CommunDays>
            </S.User>
        </S.Body>
    );
};
