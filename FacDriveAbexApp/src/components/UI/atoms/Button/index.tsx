import * as Styles from './styles';

export type ButtonProps = {
  onPress: () => void;
  label: string;
  backgroundColor: string;
  labelColor: string;
  disabled?: boolean;
  borderSize?: number;
  borderColor?: string;
};

export const Button = ({
  onPress,
  label,
  backgroundColor,
  labelColor,
  disabled,
  borderSize,
  borderColor,
}: ButtonProps) => {
  return (
    <Styles.Button
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $borderSize={borderSize}
      onPress={onPress}
      disabled={disabled}
    >
      <Styles.Text $color={labelColor}>{label}</Styles.Text>
    </Styles.Button>
  );
};
