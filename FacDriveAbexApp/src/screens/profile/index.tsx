import * as S from './styles';
import { Card } from './components/Card';
import { ProfileImage } from './components/Image';
import { Item } from './components/Item';
import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Separator } from '../../components/UI/atoms/Separator';
import { useNavigation } from '@react-navigation/native';

const setPerfilImage = async (id: number, image: string, endpoint: string) => {
    const apiNodeUrl = process.env.API_NODE_URL;

    const { data } = await axios({
        method: 'post',
        url: apiNodeUrl + endpoint,
        data: {
            idUser: id,
            userImage: image,
        },
    });

    return {
        success: data.success,
    };
};

export const ProfileScreen = () => {
    const { navigate } = useNavigation();

    const [imageData, setImageData] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [userUniversity, setUserUniversity] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userCar, setUserCar] = useState('');
    const [userName, setUserName] = useState('');

    const userId = 79;

    useEffect(() => {
        getData();
    });

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
                setPerfilImage(userId, response.assets[0].base64, 'image');
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

        const role: any = userData.usuario.isdriver ? 'Motorista' : 'Caroneiro';
        const car = userData.veiculo.brand + userData.veiculo.model;
        const birthDate: string = userData.usuario.birthdate.slice(0, 10);
        const completeName: string =
            userData.usuario.name + ' ' + userData.usuario.surname;

        setUserName(completeName);
        setUserAddress(userData.endereco.street);
        setUserUniversity('Unochapecó');
        setUserBirth(birthDate);
        setUserRole(role);
        setUserCar(car);
        setImageData(userData.usuario.userimage);
    };

    const logout = () => {
        navigate('login');
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

            <S.LogoutView>
                <S.Logout onPress={logout}>
                    <S.Text>Logout</S.Text>
                </S.Logout>
            </S.LogoutView>
        </S.Body>
    );
};
