import { useToggle } from '@uidotdev/usehooks';
import { HorisontalSeparator } from '../../../../../../components/UI/atoms/HorisontalSeparator';
import Icon from 'react-native-vector-icons/AntDesign';
import * as S from './styles';
import axios from 'axios';
import StorageService from '../../../../../../services/storage-service/storage-service';

interface UserProps {
    name: string;
    days: number;
    userId: number;
    setAllState: any;
}

export const User = ({ name, days, userId, setAllState }: UserProps) => {
    // const currentUserId: number = StorageService.get('user_id');
    const currentUserId: number = 79;

    const removeFromArray = () => {
        setAllState(prev => {
            const newArray = [...prev];

            return newArray.filter(item => item.userId != userId);
        });
    };

    const acceptRide = () => {
        const apiNodeUrl = process.env.API_NODE_URL;
        axios
            .post(apiNodeUrl + '/relationship', {
                driverId: currentUserId,
                riderId: userId,
                amount: 0.0,
            })
            .then(() => removeFromArray());
    };

    const rejectRide = () => {
        removeFromArray();
    };

    return (
        <S.User>
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
