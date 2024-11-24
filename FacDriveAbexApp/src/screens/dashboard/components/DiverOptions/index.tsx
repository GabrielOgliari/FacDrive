import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../context/useUser';
import { Riders } from './components/Riders';
import * as S from './styles';

interface UserDataType {
    name: string;
    surname: string;
    userId: number;
}

export const DriverOptions = () => {
    const { user } = useUser();

    const [ridersData, setRidersData] = useState<UserDataType[]>([]);
    const [addedUserIds, setAddedUserIds] = useState<Set<number>>(new Set());
    const [loading, setIsLoading] = useState(true);

    const fetchRelationships = () => {
        const apiPHPUrl = process.env.API_PHP_URL;
        axios.get(apiPHPUrl + '/facdrive/user/get-user-relationships?driverID=' + user.id).then(fetchData => {
            fetchData.data.response.map(async (item) => {
                if (!addedUserIds.has(item.riderid)) {
                    const response = await axios.get(apiPHPUrl + '/facdrive/user/get-user-config?iduser=' + item.riderid);
                    setRidersData(prevState => [...prevState, ...response.data.response]);
                    setAddedUserIds(prevState => new Set(prevState).add(item.riderid));
                }
            });
            setIsLoading(false)
        });
    };

    useEffect(() => {
        fetchRelationships();
    }, []);

    if (loading) {
        return
    }

    return (
        <S.Body>
            <S.Title>Seus caroneiros</S.Title>

            {ridersData.length ? ridersData.map((item, index) => (
                <Riders key={index} userimage={item.userimage} name={item.name} surname={item.surname} />
            )) : <S.Title>No momento você não tem nenhum caroneiro. Quando alguem selecionar uma rota sua aparecerá aqui!</S.Title>}
        </S.Body>
    );
};