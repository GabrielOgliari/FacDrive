import { User } from './components/User';
import * as S from './styles';
import { useEffect, useState } from 'react';

export const RideOptions = () => {
    type userDataType = Array<{
        name: string;
        days: number;
    }>;

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

    return (
        <S.Body>
            <S.Title>Recomendações de caronas</S.Title>
            {userData.map((item, index) => (
                <User key={index} name={item.name} days={item.days} />
            ))}
        </S.Body>
    );
};
