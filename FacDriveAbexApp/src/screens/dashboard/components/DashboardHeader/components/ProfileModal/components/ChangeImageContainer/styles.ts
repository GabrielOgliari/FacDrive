import styled from 'styled-components/native';
import { height, width } from '../../../../../../../../utils/dimensions';

export const StyleImage = styled.Image`
  border-radius: 4px;

  height: ${height * 0.32}px;
  width: ${width * 0.75}px;
`;

export const PersonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  background-color: #2375cc;
  border-radius: 8px;

  height: ${height * 0.32}px;
  width: ${width * 0.75}px;
`;
