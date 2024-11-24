import React from "react";
import * as S from './styles';
import { Linking } from 'react-native';

interface RiderProps {
    name: string;
    surname: string;
    userimage: string;
    phone: string
}

const openWhatsApp = (phoneNumber, message) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

    Linking.canOpenURL(whatsappUrl)
        .then(() => {
            return Linking.openURL(whatsappUrl);
        })
        .catch((err) => console.error("Erro ao abrir o WhatsApp:", err));
};

const WhatsAppButton = ({ phoneNumber, message }) => (
    <S.ButtonWhatsApp
        onPress={() => openWhatsApp(phoneNumber, message)}
    >
        <S.WhatsAppIcon name={"whatsapp"}/>
    </S.ButtonWhatsApp>
);

export const Riders = ({ name, surname, userimage, phone }: RiderProps) => {
    const image = userimage !== 'null' && userimage ? `data:image/png;base64,${userimage}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqjHyLaaUPOqbkYNiYHd7j5402wQluQDeHQg&s`;

    return (
        <S.User>
            <S.InfoView>
                <S.UserImage resizeMode={'contain'} source={{ uri: image }} />
                <S.Username>{name} {surname}</S.Username>
            </S.InfoView>
            {phone && <WhatsAppButton phoneNumber={phone} message={`Opa ${name}, tudo bem?`} />}
        </S.User>
    );
};