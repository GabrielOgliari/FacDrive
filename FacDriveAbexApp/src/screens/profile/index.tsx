import * as S from './styles';
import { Card } from './components/Card';
import { ProfileImage } from './components/Image';
import { Item } from './components/Item';
import { Separator } from './components/Separator';
import { Header } from './components/Header';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import StorageService from '../../services/storage-service/storage-service';
import setPerfilImage from '../../services/dashboard/dashboard-service';
import axios from 'axios';

export const ProfileScreen = () => {
    const [imageData, setImageData] = useState(null);
    const userId = StorageService.get('user_id');

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
                setPerfilImage(response.assets[0].base64, userId);
            }
        });
    };

    async function fetchData() {
        const apiNodeUrl = process.env.API_NODE_URL;
        const endpoint = '';
        const { data } = await axios({
            method: 'get',
            url: apiNodeUrl + endpoint + '/' + userId,
        });

        return data;
    }

    const getData = () => {
        const userData = fetchData();

        return {
            name: 'Matheus Eickhoff',
            address: 'Avenida Fernando Machado',
            university: 'Unochapecó',
            birth: '22/04/2005',
            role: 'Motorista',
            car: 'Fiat Uno',
            image: imageData,
        };
    };
    const user = getData();

    return (
        <S.Body>
            <Header />
            <ProfileImage imageData={user.image} selectImage={changeImage} />
            <Card name={user.name} role={user.role} />

            <Separator space={20} />

            <Item title="Endereço" content={user.address} icon="map-sharp" />
            <Item title="Universidade" content={user.university} icon="book" />
            <Item
                title="Data de Nascimento"
                content={user.birth}
                icon="calendar-number"
            />
            {user.role === 'Motorista' && (
                <Item title="Carro" content={user.car} icon="car" />
            )}
        </S.Body>
    );
};
