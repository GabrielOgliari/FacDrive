import { useEffect, useState } from 'react';
import { BackButton } from './components/BackButton';
import { User } from './components/User';
import * as S from './styles';
import axios from 'axios';

type UsersFetch = Array<{ driver: string; rider: string; amount: string }>;

export const Relations = () => {
    const [userData, setUserData] = useState<UsersFetch>();
    const userId = 80;

    async function fetchUserData(endpoint: string, userId: number) {
        const apiNodeUrl = process.env.API_NODE_URL;
        const response = await axios({
            method: 'get',
            url: apiNodeUrl + '/' + endpoint + '/' + userId,
        });

        return response.data;
    }

    useEffect(() => {
        fetchUserData('relationship/user', userId).then(value => {
            const newObj: UsersFetch = value.map((item: any) => {
                return {
                    driver: `${item.drivername} ${item.driversurname}`,
                    rider: `${item.ridername} ${item.ridersurname}`,
                    amount: item.amount
                }
            })
            setUserData(newObj);
        });
    });

    return (
        <S.Body>
            <S.Content>
                <S.Header>
                    <BackButton />
                    <S.Title>Relacionamentos</S.Title>
                </S.Header>
                {userData?.map(item => {
                    return (
                        <User
                            driverName={item.driver}
                            riderName={item.rider}
                            amount={item.amount}
                        />
                    );
                })}
            </S.Content>
        </S.Body>
    );
};
