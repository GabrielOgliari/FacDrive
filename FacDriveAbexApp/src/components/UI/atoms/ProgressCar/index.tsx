import React, { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CarIcon from '../../../../assets/images/car.png';
import { width } from '../../../../utils/dimensions.ts';
import * as Styles from './styles.ts';

export type ProgressCarProps = {
  totalSteps: number;
  currentStep: number;
};

export const ProgressCar = ({ totalSteps, currentStep }: ProgressCarProps) => {
  const leftDistance = useSharedValue(0);

  useEffect(() => {
    const finalPosition = width - width * 0.38;
    const stepWidth = finalPosition / totalSteps;
    const targetPosition = currentStep * stepWidth;

    leftDistance.value = withTiming(targetPosition, { duration: 1000 });
  }, [currentStep, totalSteps]);

  const animatedStyle = useAnimatedStyle(() => ({
    left: leftDistance.value,
  }));

  return (
    <Styles.LoadingCarContainer>
      <Styles.CarRoad>
        <Styles.Car
          style={animatedStyle}
          resizeMode="contain"
          source={CarIcon}
        />
      </Styles.CarRoad>

      <Styles.Road />
    </Styles.LoadingCarContainer>
  );
};
