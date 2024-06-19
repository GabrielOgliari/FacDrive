import { ReactNode } from 'react';
import * as Styles from './styles';

export type WrapperFieldProps = {
  children: ReactNode;
  hasSubmitted: boolean;
  errorMessage: string;
  size: 'sm' | 'lg';
};

export const WrapperField = ({
  children,
  hasSubmitted,
  errorMessage,
  size = 'lg',
}: WrapperFieldProps) => {
  const isShowErrorMessage = hasSubmitted && errorMessage;

  return (
    <Styles.WrapperInput>
      {children}

      {isShowErrorMessage && (
        <Styles.ErrorMessage $size={size}>{errorMessage}</Styles.ErrorMessage>
      )}
    </Styles.WrapperInput>
  );
};
