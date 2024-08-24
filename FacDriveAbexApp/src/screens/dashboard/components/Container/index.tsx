import { ReactNode } from 'react';
import * as S from './styles';

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <S.Container>{children}</S.Container>;
};
