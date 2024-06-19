import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions.ts';

export const LoadingCarContainer = styled.View`
  width: ${width * 0.92}px;
  height: ${height * 0.15}px;
`;

export const Road = styled.View`
  width: 100%;
  height: 3px;
  background-color: black;
`;

export const Car = styled(Animated.Image)`
  height: ${height * 0.1}px;
  width: ${height * 0.15}px;
  position: absolute;
`;

export const CarRoad = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-end;
`;
