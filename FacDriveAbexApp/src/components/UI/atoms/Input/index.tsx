import React, { useEffect, useState } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { height } from '../../../../utils/dimensions.ts';
import * as Styles from './styles.ts';

export type InputProps = {
  value: any;
  onChange: (value: any) => void;
  mode: 'default' | 'password';
  placeholder: string;
  keyboard?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  type?: 'text' | 'number' | 'date';
  readOnly?: boolean;
  blocked?: boolean;
  size?: 'sm' | 'lg';
};

export const Input = ({
  onChange,
  value,
  placeholder,
  mode = 'default',
  blocked = false,
  readOnly,
  keyboard,
  type = 'text',
  size = 'lg',
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const placeHolderOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: placeHolderOpacity.value,
  }));

  useEffect(() => {
    if (!blocked) {
      if (value !== undefined && placeHolderOpacity.value === 0) {
        placeHolderOpacity.value = withTiming(1, { duration: 200 });
      } else if (value === undefined) {
        placeHolderOpacity.value = withTiming(0, { duration: 100 });
      }
    }
  }, [value, blocked]);

  const handleTextChange = (text: string) => {
    switch (type) {
      case 'number':
        const numericValue = parseFloat(text);
        onChange(isNaN(numericValue) ? 0 : numericValue);
        break;
      case 'date':
        const dateValue = new Date(text);
        onChange(isValidDate(dateValue) ? dateValue : new Date());
        break;
      default:
        onChange(text);
    }
  };

  const isValidDate = (date: Date) => {
    return !isNaN(date.getTime());
  };

  return (
    <Styles.Wrapper $isFocused={isFocus} $blocked={blocked} $size={size}>
      <Styles.OverPlaceholder style={animatedStyle}>
        {placeholder}
      </Styles.OverPlaceholder>

      <Styles.Input
        keyboardType={getKeyboardType(type, keyboard)}
        readOnly={readOnly}
        editable={!blocked}
        autoComplete="off"
        placeholderTextColor="#6C6C6C"
        secureTextEntry={mode === 'password' ? !showPassword : false}
        value={formatValue(value)}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />

      {mode === 'password' && (
        <Styles.ShowPassword onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye' : 'eye-off'}
            color="black"
            size={height * 0.03}
          />
        </Styles.ShowPassword>
      )}
    </Styles.Wrapper>
  );
};

const getKeyboardType = (inputType: string, defaultKeyboardType?: string) => {
  switch (inputType) {
    case 'number':
      return 'numeric';
    case 'date':
      return 'default';
    default:
      return defaultKeyboardType || 'default';
  }
};

const formatValue = (value: any): string => {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  } else if (typeof value === 'number') {
    return value.toString();
  } else {
    return value || '';
  }
};
