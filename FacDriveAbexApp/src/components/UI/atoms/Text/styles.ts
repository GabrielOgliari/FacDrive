import styled from 'styled-components/native';

export const Text = styled.Text<{
  $type?: 'title' | 'subtitle' | 'text' | 'light';
}>`
  font-size: ${({ $type }) => {
    if ($type === 'title') return '20px';
    if ($type === 'subtitle') return '18px';
    if ($type === 'light') return '14px';

    return '16px';
  }};

  font-weight: ${({ $type }) => {
    if ($type === 'title') return 500;
    if ($type === 'subtitle') return 500;
    if ($type === 'light') return 300;

    return 400;
  }};

  color: ${({ $type }) => {
    if ($type === 'title') return '#2e2e2e';
    if ($type === 'subtitle') return '#2e2e2e';
    if ($type === 'light') return '#575757';

    return '#575757';
  }};
`;
