import styled from 'styled-components/native';
import { width, height } from '../../../../utils/dimensions';

export const Body = styled.View`
    margin-top: 10px;
    margin-left: ${width * 0.25}px;
`;

export const RowBox = styled.View`
    justify-content: left;
    align-items: center;
    flex-direction: row;
`;

export const Title = styled.Text`
    font-weight: bold;
    color: rgb(0, 0, 0);
`;

export const Content = styled.Text`
    color: rgb(0, 0, 0);
    margin-left: 10px;
`;
