import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: #e6e6e6;
  border-radius: 16px;
  padding: 10px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Image = styled.Image`
  height: 108px;
  width: 108px;
  border-radius: 8px;
  margin-right: 10px;
  background-color: #dcdcdc;
`;

export const Container = styled.View`
  flex: 1;
  gap: 4px;
  width: 100%;
`;

export const Wrapper = styled.View`
  flex-direction: column;
`;

export const Group = styled.View`
  flex-direction: column;
`;

export const Label = styled.Text`
  font-size: 10px;
  font-weight: 400;
  color: #4e4e4e;
`;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #404040;
`;

export const Button = styled.TouchableOpacity<{ $isPaid: boolean }>`
  background-color: ${({ $isPaid }) => ($isPaid ? '#4AA053' : '#A04A4A')};
  border-radius: 4px;
  padding: 8px 12px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const TextButton = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
`;
