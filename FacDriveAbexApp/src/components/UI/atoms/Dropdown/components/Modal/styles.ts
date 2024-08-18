import styled from 'styled-components/native';
import { height } from '../../../../../../utils/dimensions';

export const ModalOverlay = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: white;
  padding: 22px;
  border-radius: 22px;
  width: 80%;
  align-self: center;
  max-height: ${height * 0.8}px;
`;

export const Option = styled.TouchableOpacity<{ $isSelected: boolean }>`
  padding: 16px;

  border-radius: 12px;

  background-color: ${({ $isSelected }) => {
    if ($isSelected) return '#ddd';
    return 'white';
  }};
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
`;
