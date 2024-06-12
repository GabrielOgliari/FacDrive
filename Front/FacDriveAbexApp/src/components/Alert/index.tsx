import { AlertContainer, AlertMessage } from './styles.ts';

export type AlertProps = {
  success: boolean;
};

export const Alert = ({ success }: AlertProps) => {
  return (
    <AlertContainer success={success}>
      <AlertMessage>{success ? 'Sucesso' : 'Falha my bro'}</AlertMessage>
    </AlertContainer>
  );
};
