import { ReactNode } from 'react';
import * as S from './styles';

type TextProps = {
  children: ReactNode;
  type?: 'title' | 'subtitle' | 'text' | 'light';
};

export const Text = ({ children, type }: TextProps) => {
  return <S.Text $type={type}>{children}</S.Text>;
};
