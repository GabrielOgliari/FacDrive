import styled from 'styled-components/native';
import { width, height } from '../../../../utils/dimensions';

export const Body = styled.View`
    margin-top: 20px;
    align-items: center;
`;

export const RowBox = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;

    width: ${width * 0.9}px;
    height: ${height * 0.05}px;

    border-radius: 10px;
    background-color: #0082c8;
    border-color: black;
`;

export const Item = styled.Text`
    color: rgb(255, 255, 255);
    margin-left: 15px;
`;

export const Address = styled.Text`
    color: rgb(0, 0, 0);
    margin-top: 10px;
`;
