import * as S from './styles';
import { Card } from './components/Card';
import { ProfileImage } from './components/Image';
import { Item } from './components/Item';
import { Header } from './components/Header';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Separator } from '../../components/UI/atoms/Separator';
import { useNavigation } from '@react-navigation/native';
import StorageService from '../../services/storage-service/storage-service.ts';
import { Loader } from '../../components/UI/atoms/Loader';

export const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userID, setUSerID] = useState(0);
    const [imageData, setImageData] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [userUniversity, setUserUniversity] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userCar, setUserCar] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const resp = await StorageService.get('userProps');
            if (!resp?.id) {
                navigation.navigate('login');
                return;
            }
            setUSerID(resp.id);

            const userData = await fetchUserData('user', resp.id);

            const role = userData.usuario.isdriver ? 'Motorista' : 'Caroneiro';
            const car = userData.veiculo?.brand ?? '' + userData.veiculo?.model ?? '';
            const birthDate = userData.usuario?.birthdate.slice(0, 10);
            const completeName = `${userData.usuario.name} ${userData.usuario.surname}`;

            setUserName(completeName);
            setUserAddress(userData.endereco.street);
            setUserUniversity('Unochapecó');
            setUserBirth(birthDate);
            setUserRole(role);
            setUserCar(car);
            setImageData(userData.usuario.userimage);
            setLoading(false);
        };

        getData();
    }, [navigation]);

    const setPerfilImage = async (image, endpoint) => {
        const apiNodeUrl = process.env.API_NODE_URL;

        const { data } = await axios.post(apiNodeUrl + endpoint, {
            idUser: userID,
            userImage: image,
        });

        return { success: data.success };
    };

    const changeImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image Picker Error:', response.errorMessage);
            } else {
                setImageData(response.assets[0].base64);
                setPerfilImage(response.assets[0].base64, 'image');
            }
        });
    };

    const fetchUserData = async (endpoint, userId) => {
        const apiNodeUrl = process.env.API_NODE_URL;
        const response = await axios.get(`${apiNodeUrl}/${endpoint}/${userId}`);
        return response.data;
    };

    const logout = () => {
        navigation.navigate('login');
    };

    if (loading) {
        return <Loader loading={true} />;
    }

    return (
        <S.Body>
            <Header />
            <ProfileImage imageData={imageData} selectImage={changeImage} />
            <Card name={userName} role={userRole} />

            <Separator space={20} />

            <Item title="Endereço" content={userAddress} icon="map-sharp" />
            <Item title="Universidade" content={userUniversity} icon="book" />
            <Item title="Data de Nascimento" content={userBirth} icon="calendar-number" />
            {userRole === 'Motorista' && <Item title="Carro" content={userCar} icon="car" />}

            <S.LogoutView>
                <S.Logout onPress={logout}>
                    <S.Text>Logout</S.Text>
                </S.Logout>
            </S.LogoutView>
        </S.Body>
    );
};
