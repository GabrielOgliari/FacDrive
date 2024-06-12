import React, {useEffect, useState} from 'react';
import {
  CustomInputContainer,
  Input,
  OverPlaceholder,
  ShowPassword,
} from './styles.ts';
import {CustomInputProps} from './interface';
import Icon from 'react-native-vector-icons/Feather';
import {height} from '../../utils/Functions.ts';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CustomInput: React.FC<CustomInputProps> = ({
  onChangeText,
  value,
  placeHolder,
  isPassword,
  halfInput,
  blocked,
  keyboardType,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(isPassword);

  const placeHolderOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: placeHolderOpacity.value,
  }));

  useEffect(() => {
    if(!blocked){
      if (value && placeHolderOpacity.value === 0) {
        placeHolderOpacity.value = withTiming(1, {duration: 200});
      } else if (!value) {
        placeHolderOpacity.value = withTiming(0, {duration: 100});
      }
    }
  }, [value]);

  return (
    <CustomInputContainer
      isFocused={isFocus}
      halfInput={halfInput}
      blocked={blocked}>
      <OverPlaceholder style={animatedStyle}>{placeHolder}</OverPlaceholder>
      <Input
        keyboardType={keyboardType ?? 'default'}
        editable={!blocked}
        autoComplete={'off'}
        placeholderTextColor={'#6C6C6C'}
        secureTextEntry={showPassword}
        value={value}
        placeholder={placeHolder}
        onChangeText={onChangeText}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
      {isPassword && (
        <ShowPassword onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            color={'black'}
            size={height * 0.03}
          />
        </ShowPassword>
      )}
    </CustomInputContainer>
  );
};

export {CustomInput};
