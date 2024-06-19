import styled from 'styled-components/native';
import { width } from '../../utils/dimensions.ts';

export const PresentationContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;

export const TextH1 = styled.Text`
  font-size: 36px;
  color: #000;
  font-weight: bold;
  text-align: center;
`;

export const TextH3 = styled.Text`
  font-size: 16px;
  text-align: center;
`;

export const ButtonsView = styled.View`
  flex: 1;
`;

export const TextsView = styled.View`
  flex: 1;
  justify-content: space-around;
`;

export const AppLogo = styled.Image`
  height: ${width * 0.8}px;
  width: ${width * 0.8}px;
`;
