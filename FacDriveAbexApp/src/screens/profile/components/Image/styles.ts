import styled from 'styled-components/native';
import { width, height } from '../../../../utils/dimensions';

export const Body = styled.View`
    margin-top: 1%;
    align-items: center;
`;

export const Image = styled.Image`
    width: ${width * 0.6}px;
    height: ${height * 0.3}px;

    border-radius: 5000px;
`;

export const Warper = styled.View`
    align-items: center;
    justify-content: center;

    width: ${(width * 0.6)+10}px;
    height: ${(height * 0.3)+10}px;

    border-color: #0082c8;
    border-width: 2px;
    border-radius: 5000px;
`;
