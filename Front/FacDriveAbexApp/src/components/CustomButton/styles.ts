import styled from 'styled-components/native';
import {height, width} from '../../utils/Functions.ts';

export const CustomButtonContainer = styled.TouchableOpacity<{
  bg: string;
  bs?: number;
  bc?: string;
}>`
  width: ${width * 0.9}px;
  height: ${height * 0.1}px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background-color: ${props => props.bg};
  border: ${props => props.bs ?? 0}px ${props => props.bc ?? 'transparent'};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ButtonLabel = styled.Text<{color: string}>`
  font-size: ${height * 0.025}px;
  color: ${props => props.color};
`;
