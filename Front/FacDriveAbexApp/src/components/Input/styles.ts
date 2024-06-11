import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { height, width } from '../../utils/functions.ts';

export const WrapperInput = styled.View``;

export const CustomInputContainer = styled.TouchableOpacity<{
  isFocused: boolean;
  halfInput: boolean;
  blocked: boolean;
}>`
  width: ${props => (props.halfInput ? width * 0.42 : width * 0.9)}px;
  height: ${height * 0.08}px;
  background-color: ${props => (props.blocked ? '#ddd' : 'white')};
  border-radius: 22px;
  border: ${props => (props.isFocused ? '2px #24C2F9' : '1px #000')};
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding-left: 8%;
  padding-right: 8%;
  font-size: ${height * 0.02}px;
  color: #000;
`;

export const ShowPassword = styled.TouchableOpacity`
  width: 15%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const OverPlaceholder = styled(Animated.Text)`
  padding-left: 6px;
  padding-right: 6px;
  color: #000;
  position: absolute;
  top: -${height * 0.014}px;
  left: ${width * 0.06}px;
  background-color: white;
  font-size: ${height * 0.018}px;
`;

export const ErrorMessage = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: red;
`;
