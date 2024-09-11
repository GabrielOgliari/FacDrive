import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);

  padding: 16px;
`;

export const ModalView = styled.View`
  gap: 8px;

  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  width: 100%;
`;
