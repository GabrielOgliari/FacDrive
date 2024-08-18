import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions.ts';

export const FetchDataButtonContainer = styled.TouchableOpacity`
  width: ${width * 0.9}px;
  height: ${height * 0.08}px;
  border-radius: 20px;
  background-color: #999;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  elevation: 5;
  padding-right: 15px;
  padding-left: 15 px;
`;

export const ButtonLabel = styled.Text`
  font-size: 16px;
  color: black;
  width: 70%;
`;

export const ButtonIcon = styled(Icon)`
  font-size: 24px;
  color: black;
`;
