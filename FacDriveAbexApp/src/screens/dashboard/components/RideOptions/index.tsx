import Icon from 'react-native-vector-icons/AntDesign';
import { HorisontalSeparator } from '../../../../components/UI/atoms/HorisontalSeparator';
import * as S from './styles';
import { useEffect, useState } from 'react';

export const RideOptions = () => {
    type userDataType = Array<{ name: string; days: number }>;

    const [userData, setUserData] = useState([{}]);

    const fetchUsers = () => {
        const tempUserData: userDataType = [
            {
                name: 'Matheus Petri',
                days: 5,
            },
            {
                name: 'Evandro Jonas',
                days: 2,
            },
            {
                name: 'Lucas Silva',
                days: 1,
            },
        ];

        setUserData(tempUserData);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const acceptRide = () => {
        console.log('accepted');
    };

    const rejectRide = () => {
        console.log('rejected');
    };

    return (
        <S.Body>
            <S.Title>Recomendações de caronas</S.Title>
            {userData.map((item, index) => {
                return (
                    <S.User key={index}>
                        <S.InfoView>
                            <S.Username>{item.name}</S.Username>
                            <HorisontalSeparator space={10} />

                            <S.CommunDays>
                                {item.days} Dias em comum
                            </S.CommunDays>
                        </S.InfoView>

                        <S.ButtonsView>
                            <S.Button onPress={acceptRide}>
                                <Icon
                                    size={20}
                                    color="green"
                                    name="checkcircleo"
                                />
                            </S.Button>

                            <S.Button onPress={rejectRide}>
                                <Icon size={20} color="red" name="frowno" />
                            </S.Button>
                        </S.ButtonsView>
                    </S.User>
                );
            })}
        </S.Body>
    );
};
