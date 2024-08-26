import { ReactNode } from 'react';
import * as Styles from './styles';

export type WrapperFieldProps = {
  children: ReactNode;
  hasSubmitted: boolean;
  errorMessage: string;
  size: 'sm' | 'lg';
  hidden?: boolean;
};

export const WrapperField = ({
  children,
  hasSubmitted,
  errorMessage,
  size = 'lg',
  hidden = false,
}: WrapperFieldProps) => {
  if (hidden) {
    return null;
  }

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
