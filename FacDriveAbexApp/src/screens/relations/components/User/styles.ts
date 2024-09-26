import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions';

export const Body = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: #e7e7e7;

    width: ${width * 0.9}px;
    height: ${height * 0.1}px;

    margin-top: 5%;

    border-radius: 5px;
    border-color: lightgray;
    border-width: 1px;
`;

export const CenterView = styled.View`
    flex-direction: row;
`;

export const RiderView = styled.View`
    align-items: center;
    margin-left: 25px;
`;

export const Title = styled.Text`
    font-weight: bold;
`;

export const Text = styled.Text``;

export const DriverView = styled.View`
    margin-right: 25px;
    align-items: center;
`;
