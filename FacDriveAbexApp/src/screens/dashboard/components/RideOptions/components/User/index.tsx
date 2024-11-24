import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import * as S from './styles';
import {Linking} from "react-native";
import React from "react";

interface UserProps {
    name: string;
    days: number;
    userId: number;
    setAllState: any;
    phone: string
}

export const User = ({ name, days, userId, setAllState, phone }: UserProps) => {
    const currentUserId: number = 79;

    const removeFromArray = () => {
        setAllState(prev => {
            const newArray = [...prev];

            return newArray.filter(item => item.userId != userId);
        });
    };

    const acceptRide = () => {
        const apiNodeUrl = process.env.API_NODE_URL;
        axios
            .post(apiNodeUrl + '/relationship', {
                driverId: currentUserId,
                riderId: userId,
                amount: 0.0,
            })
            .then(() => removeFromArray());
    };

    const rejectRide = () => {
        removeFromArray();
    };

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

    return (
        <S.User>
            <S.InfoView>
                <S.Username>{name}</S.Username>
                <S.CommunDays>{days} Dias em comum</S.CommunDays>
            </S.InfoView>

            <S.ButtonsView>
                <S.Button onPress={() => openWhatsApp(phone, `Ola ${name}, tudo bem?`)}>
                    <Icon size={20} color="green" name="logo-whatsapp" />
                </S.Button>

                <S.Button onPress={acceptRide}>
                    <Icon size={20} color="blue" name="checkmark-circle-outline" />
                </S.Button>

                <S.Button onPress={rejectRide}>
                    <Icon size={20} color="red" name="close-circle-outline" />
                </S.Button>
            </S.ButtonsView>
        </S.User>
    );
};
