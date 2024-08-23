import styled from 'styled-components/native';

export const Flex = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: #2375cc;
  border-radius: 8px;

  padding: 16px;
  width: 48%;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: #eb2828;
  border-radius: 8px;

  padding: 16px;
  width: 48%;
`;

export const TextButton = styled.Text`
  color: #ffffff;
  text-align: center;
`;

export const GreenContainer = styled.View`
  background-color: #18ab4d;
  padding: 16px;
  border-radius: 8px;
`;

export const RedContainer = styled.View`
  background-color: #eb2828;
  padding: 16px;
  border-radius: 8px;
`;

export const Text = styled.Text`
  color: #ffffff;
  font-weight: 400;
  text-align: center;
`;
