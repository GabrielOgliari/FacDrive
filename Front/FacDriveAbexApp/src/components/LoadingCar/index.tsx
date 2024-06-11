import React, { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CarIcon from '../../assets/images/car.png';
import { Car, CarRoad, LoadingCarContainer, Road } from './styles.ts';

type LoadingCarProps = {
  iniciaLeft: number;
  finalLeft: number;
};

export const LoadingCar = ({ iniciaLeft, finalLeft }: LoadingCarProps) => {
  const leftDistance = useSharedValue(iniciaLeft);
  useEffect(() => {
    if (leftDistance.value != finalLeft) {
      leftDistance.value = withTiming(finalLeft, { duration: 1000 });
    }
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    left: leftDistance.value,
  }));

  return (
    <LoadingCarContainer>
      <CarRoad>
        <Car style={animatedStyle} resizeMode="contain" source={CarIcon} />
      </CarRoad>
      <Road />
    </LoadingCarContainer>
  );
};
