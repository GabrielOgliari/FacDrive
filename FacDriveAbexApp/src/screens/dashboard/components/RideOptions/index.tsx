import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../context/useUser';
import { User } from './components/User';
import * as S from './styles';

interface UserDataType {
    name: string;
    days: number;
    userId: number;
}

export const RideOptions = () => {
    const { user } = useUser();

    const [userData, setUserData] = useState([{}]);

    const fetchUsers = () => {
        const apiNodeUrl = process.env.API_NODE_URL;
        axios.get(apiNodeUrl + '/classdays/nearby/' + user.id).then(fetchData => {
            const treatedData = fetchData.data.map(userUntreat => {
                const name = `${userUntreat.name} ${userUntreat.surname}`;
                const days = userUntreat.days_count;
                const userId = userUntreat.iduser;

                const user: UserDataType = {
                    name,
                    days,
                    userId,
                };

                return user;
            });

            setUserData(treatedData);
        });
    };

    useEffect(() => {
        fetchUsers(user.id);
    }, []);

    const showTitle = userData.length == 0 ? 'none' : 'flex';

    return (
        <S.Body>
            <S.Title style={{ display: showTitle }}>Recomendações de caronas</S.Title>

            {userData.map((item, index) => (
                <User key={index} name={item.name} days={item.days} userId={item.userId} phone={item.phone} setAllState={setUserData} />
            ))}
        </S.Body>
    );
};
