import * as Styles from './styles';

export type ButtonProps = {
  onPress: () => void;
  label: string;
  backGroundColor: string;
  labelColor: string;
  disabled?: boolean;
  borderSize?: number;
  borderColor?: string;
};

export const Button = ({
  onPress,
  label,
  backGroundColor,
  labelColor,
  disabled,
  borderSize,
  borderColor,
}: ButtonProps) => {
  return (
    <Styles.CustomButtonContainer
      bg={backGroundColor}
      bc={borderColor}
      bs={borderSize}
      onPress={onPress}
      disabled={disabled}
    >
      <Styles.ButtonLabel color={labelColor}>{label}</Styles.ButtonLabel>
    </Styles.CustomButtonContainer>
  );
};
