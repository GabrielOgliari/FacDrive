import { Input, InputProps } from '../../atoms/Input';
import { WrapperField, WrapperFieldProps } from '../../atoms/WrapperField';

type Props = InputProps & Omit<WrapperFieldProps, 'children'>;

export const InputField = ({
  errorMessage,
  hasSubmitted,
  size,
  hidden,
  ...props
}: Props) => {
  return (
    <WrapperField
      errorMessage={errorMessage}
      hasSubmitted={hasSubmitted}
      size={size}
      hidden={hidden}
    >
      <Input size={size} {...props} />
    </WrapperField>
  );
};
