import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { width } from '../../../utils/dimensions';

export const Container = styled(KeyboardAvoidingView).attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex-grow: 1;
  background-color: white;
`;

export const Title = styled.Text`
  font-size: ${width * 0.08}px;
  font-weight: bold;
  color: black;

  margin-top: ${width * 0.08};
  margin-bottom: ${width * 0.08};

  width: ${width * 0.9};
  word-break: break-all;
`;
