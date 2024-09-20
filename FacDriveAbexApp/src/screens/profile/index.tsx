import * as S from './styles';
import { Card } from './components/Card';
import { ProfileImage } from './components/Image';
import { Item } from './components/Item';
import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import StorageService from '../../services/storage-service/storage-service';
import service from '../../services/dashboard/dashboard-service';
import axios from 'axios';
import { Separator } from '../../components/UI/atoms/Separator';

export const ProfileScreen = () => {
    const [imageData, setImageData] = useState(null);
    const [userRole, setUserRole] = useState(undefined);
    const [userUniversity, setUserUniversity] = useState(undefined);
    const [userAddress, setUserAddress] = useState(undefined);
    const [userBirth, setUserBirth] = useState(undefined);
    const [userCar, setUserCar] = useState(undefined);
    const [userName, setUserName] = useState(undefined);

    // const userId = StorageService.get('user_id');
    const userId = 79;

    useEffect(() => {
        getData();
    }, []);

    const changeImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image Picker Error: ', response.errorMessage);
            } else {
                setImageData(response.assets[0].base64);
                service.setPerfilImage(userId, response.assets[0].base64);
            }
        });
    };

    async function fetchUserData(endpoint: string, userId: number) {
        const apiNodeUrl = process.env.API_NODE_URL;
        const response = await axios({
            method: 'get',
            url: apiNodeUrl + '/' + endpoint + '/' + userId,
        });

        return response.data;
    }

    const getData = async () => {
        const userData = await fetchUserData('user', userId);

        const role: any = userData.usuario.isdriver ? 'Mororista' : 'Caroneiro';
        const car = userData.veiculo.brand + userData.veiculo.model;

        setUserName(userData.usuario.name + " " + userData.usuario.surname);
        setUserAddress(userData.endereco.street);
        setUserUniversity('Unochapecó');
        setUserBirth(userData.usuario.birthdate);
        setUserRole(role);
        setUserCar(car);
        setImageData(userData.usuario.userimage);

        console.log(userName, userBirth, userCar, userUniversity, userRole);
    };

    return (
        <S.Body>
            <Header />
            <ProfileImage imageData={imageData} selectImage={changeImage} />
            <Card name={userName} role={userRole} />

            <Separator space={20} />

            <Item title="Endereço" content={userAddress} icon="map-sharp" />
            <Item title="Universidade" content={userUniversity} icon="book" />
            <Item
                title="Data de Nascimento"
                content={userBirth}
                icon="calendar-number"
            />
            {userRole === 'Motorista' && (
                <Item title="Carro" content={userCar} icon="car" />
            )}
        </S.Body>
    );
};
