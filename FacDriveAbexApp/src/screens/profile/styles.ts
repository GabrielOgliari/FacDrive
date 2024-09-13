import styled from 'styled-components/native';
import {width, height} from '../../utils/dimensions'

export const Body = styled.ScrollView`
    margin-top: 10%;
`;

export const ProfileImage = styled.Image`
    margin-botton: 10px;

    width: ${width * 0.2}px;
    height: ${height * 0.2}px;

    border-radius: 50%;
    border-color: black;
`;
