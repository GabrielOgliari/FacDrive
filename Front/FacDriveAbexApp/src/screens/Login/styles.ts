import styled from 'styled-components/native';
import { width } from '../../utils/functions';

export const Wrapper = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  height: 100%;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: black;
  width: ${width * 0.9}px;
`;

export const WrapperFields = styled.View``;
