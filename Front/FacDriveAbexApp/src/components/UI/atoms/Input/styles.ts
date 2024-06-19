import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions.ts';

export const Wrapper = styled.TouchableOpacity<{
  $isFocused: boolean;
  $blocked: boolean;
  $size: 'sm' | 'lg';
}>`
  width: ${({ $size }) => {
    if ($size === 'sm') return `${width / 2.3}px`;
    if ($size === 'lg') return `${width * 0.9}px`;
  }};

  height: ${height * 0.08}px;

  background-color: ${({ $blocked }) => ($blocked ? '#ddd' : 'white')};
  border-radius: 22px;
  border: ${({ $isFocused }) => ($isFocused ? '2px #24C2F9' : '1px #000')};
  flex-direction: row;
`;

export const Input = styled.TextInput`
  flex: 1;

  padding-left: 32px;
  padding-right: 32px;

  font-size: ${width * 0.045}px;

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
