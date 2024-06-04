import styled from 'styled-components'

export const Button = styled.button`
  font-size: ${({ theme }) => theme.sizes.medium};
  font-weight: ${({ theme }) => theme.weights.bold};

  padding: ${({ theme }) => theme.spacings.small};
  border-radius: 8px;

  width: 100%;
  border: 0;

  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  cursor: pointer;
`
