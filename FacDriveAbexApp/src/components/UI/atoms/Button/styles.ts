import styled from 'styled-components/native';
import { height, width } from '../../../../utils/dimensions.ts';

export const Button = styled.TouchableOpacity<{
  $backgroundColor: string;
  $borderSize?: number;
  $borderColor?: string;
}>`
  justify-content: center;

  width: ${width * 0.9}px;
  height: ${height * 0.1}px;

  background-color: ${({ $backgroundColor }) => $backgroundColor};

  border: ${({ $borderSize }) => {
    if ($borderSize) return $borderSize;
  }};

  border-color: ${({ $borderColor }) => {
    if ($borderColor) return $borderColor;
    return 'transparent';
  }};

  border-radius: 22px;

  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Text = styled.Text<{ $color: string }>`
  font-size: ${height * 0.025}px;

  color: ${({ $color }) => {
    if ($color) return $color;
    return 'black';
  }};

  text-align: center;
`;
