import { useToggle } from '@uidotdev/usehooks';
import { HorisontalSeparator } from '../../../../../../components/UI/atoms/HorisontalSeparator';
import Icon from 'react-native-vector-icons/AntDesign';
import * as S from './styles';

interface UserProps {
    name: string;
    days: number;
}

export const User = ({ name, days }: UserProps) => {
    const [display, toggleDisplay] = useToggle(true);

    const acceptRide = () => {
        toggleDisplay();
        console.log('Accepted');
    };

    const rejectRide = () => {
        toggleDisplay();
        console.log('Rejected');
    };

    return (
        <S.User style={{ display: display ? 'flex' : 'none' }}>
            <S.InfoView>
                <S.Username>{name}</S.Username>
                <HorisontalSeparator space={10} />

                <S.CommunDays>{days} Dias em comum</S.CommunDays>
            </S.InfoView>

            <S.ButtonsView>
                <S.Button onPress={acceptRide}>
                    <Icon size={20} color="green" name="checkcircleo" />
                </S.Button>

                <S.Button onPress={rejectRide}> 
                    <Icon size={20} color="red" name="frowno" />
                </S.Button>
            </S.ButtonsView>
        </S.User>
    );
};
