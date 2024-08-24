import styled from 'styled-components/native';

export const Days = styled.View`
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

export const DayItem = styled.View<{ $isActive: boolean }>`
  border-width: 1px;

  border-color: ${({ $isActive }) => {
    if (!$isActive) {
      return '#d1d1d1';
    }
    return '#32535e';
  }};

  background-color: ${({ $isActive }) => {
    if (!$isActive) {
      return '#d1d1d1';
    }
    return '#32535e';
  }};

  border-radius: 8px;

  width: 30%;

  padding: 16px;
`;

export const DayText = styled.Text<{ $isActive: boolean }>`
  color: ${({ $isActive }) => {
    if (!$isActive) {
      return '#575757';
    }
    return '#ffffff';
  }};

  text-align: center;
`;
