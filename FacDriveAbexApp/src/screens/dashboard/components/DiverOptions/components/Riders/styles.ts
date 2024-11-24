import styled from 'styled-components/native';
import Icon from "react-native-vector-icons/FontAwesome";

export const User = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 8px;

    height: 50px;
    width: 100%;

    border-radius: 15px;
    border-color: rgba(0, 0, 0, 0.2);
    border-width: 1px;
    background-color: rgba(0, 0, 0, 0.04);
`;

export const InfoView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    margin-left: 15px;
`;


export const Username = styled.Text`
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
    font-size: 14px;
`;

export const UserImage = styled.Image`
    height: 40px;
    width: 40px;
    border-radius: 20px;
`;

export const WhatsAppIcon = styled(Icon)`
    color: green;
    font-size: 26px;
`

export const ButtonWhatsApp = styled.TouchableOpacity`
    height: 100%;
    width: 40px;
    align-items: center;
    justify-content: center;
`