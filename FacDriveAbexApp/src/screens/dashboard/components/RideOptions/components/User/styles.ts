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
    flex-direction: column;
    align-items: flex-start;

    margin-left: 15px;
`;

export const ButtonsView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 8px;

    margin-right: 15px;
`;
export const Username = styled.Text`
    color: rgba(0, 0, 0, 0.6);
    font-weight: bold;
    font-size: 14px;
`;

export const CommunDays = styled.Text`
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
`;

export const Button = styled.TouchableOpacity``;


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