import React from 'react';
import {ButtonLabel, CustomButtonContainer} from './styles.ts';
import {CustomButtonProps} from './interface';

const CustomButton: React.FC<CustomButtonProps> = ({
  borderColor,
  borderSize,
  labelColor,
  label,
  backGroundColor,
  onPress,
  disable,
}) => {
  return (
    <CustomButtonContainer
      bg={backGroundColor}
      bc={borderColor}
      bs={borderSize}
      onPress={onPress}
      disabled={disable}>
      <ButtonLabel color={labelColor}>{label}</ButtonLabel>
    </CustomButtonContainer>
  );
};

export {CustomButton};
