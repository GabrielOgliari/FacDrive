import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions.ts';

export const DropdownContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 22px;
  border: 1px solid #000;

  margin-bottom: 10px;
  margin-top: 10px;

  height: ${height * 0.08}px;
  width: ${width * 0.9}px;
`;

export const DropdownButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;

  padding-left: 32px;
  padding-right: 32px;

  height: 100%;
  width: 100%;
`;

export const DropdownText = styled.Text<{ $isBlackColor: boolean }>`
  font-size: ${height * 0.02}px;
  color: ${({ $isBlackColor }) => {
    if (!$isBlackColor) return '#6c6c6c';
    return 'black';
  }};
`;
