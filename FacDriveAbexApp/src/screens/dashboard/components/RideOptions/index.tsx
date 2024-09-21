import Icon from 'react-native-vector-icons/AntDesign';
import { HorisontalSeparator } from '../../../../components/UI/atoms/HorisontalSeparator';
import * as S from './styles';
import { useEffect, useState } from 'react';

export const RideOptions = () => {
    type userDataType = Array<{
        id: number;
        name: string;
        days: number;
        display: boolean;
    }>;

    const [userData, setUserData] = useState([{}]);

    const fetchUsers = () => {
        const tempUserData: userDataType = [
            {
                id: 0,
                name: 'Matheus Petri',
                days: 5,
                display: true,
            },
            {
                id: 1,
                name: 'Evandro Jonas',
                days: 2,
                display: true,
            },
            {
                id: 2,
                name: 'Lucas Silva',
                days: 1,
                display: true,
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

    const updateValue = (index, newValue) => {
        setUserData(prevState =>
            prevState.map(item =>
                item.id === index ? { ...item, display: newValue } : item,
            ),
        );
    };

    return (
        <S.Body>
            <S.Title>Recomendações de caronas</S.Title>
            {userData.map((item, index) => {
                return (
                    <S.User
                        key={index}
                        style={{ display: item.display ? 'flex' : 'none' }}
                    >
                        <S.InfoView>
                            <S.Username>{item.name}</S.Username>
                            <HorisontalSeparator space={10} />

                            <S.CommunDays>
                                {item.days} Dias em comum
                            </S.CommunDays>
                        </S.InfoView>

                        <S.ButtonsView>
                            <S.Button
                                onPress={() => {
                                    updateValue(index, false);
                                    acceptRide();
                                }}
                            >
                                <Icon
                                    size={20}
                                    color="green"
                                    name="checkcircleo"
                                />
                            </S.Button>

                            <S.Button
                                onPress={() => {
                                    updateValue(index, false);
                                    rejectRide();
                                }}
                            >
                                <Icon size={20} color="red" name="frowno" />
                            </S.Button>
                        </S.ButtonsView>
                    </S.User>
                );
            })}
        </S.Body>
    );
};
