import axios from 'axios';
import { User } from './components/User';
import * as S from './styles';
import { useEffect, useState } from 'react';
import StorageService from '../../../../services/storage-service/storage-service';

export const RideOptions = () => {
    interface UserDataType {
        name: string;
        days: number;
        userId: number;
    }

    const [userData, setUserData] = useState([{}]);
    const currentUserId: number = StorageService.get('user_id');
    // const currentUserId: number = 79;

    const fetchUsers = (userId: number) => {
        const apiNodeUrl = process.env.API_NODE_URL;
        axios
            .get(apiNodeUrl + '/classdays/nearby/' + userId)
            .then(fetchData => {
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
        fetchUsers(currentUserId);
    }, []);

    const showTitle = userData.length == 0 ? 'none' : 'flex';

    return (
        <S.Body>
            <S.Title style={{ display: showTitle }}>
                Recomendações de caronas
            </S.Title>

            {userData.map((item, index) => (
                <User
                    key={index}
                    name={item.name}
                    days={item.days}
                    userId={item.userId}
                    setAllState={setUserData}
                />
            ))}
        </S.Body>
    );
};
