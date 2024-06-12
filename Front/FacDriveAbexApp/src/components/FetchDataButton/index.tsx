import { ButtonIcon, ButtonLabel, FetchDataButtonContainer } from './styles.ts';

type FetchDataButtonProps = {
  onPress: () => void;
  label: string;
  iconName: string;
};

export const FetchDataButton = ({
  onPress,
  label,
  iconName,
}: FetchDataButtonProps) => {
  return (
    <FetchDataButtonContainer onPress={onPress}>
      <ButtonLabel numberOfLines={1}>{label}</ButtonLabel>
      <ButtonIcon name={iconName} />
    </FetchDataButtonContainer>
  );
};
