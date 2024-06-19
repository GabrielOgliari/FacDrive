import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import * as S from './styles';

export const FullScreenLoader = ({ loading = true }) => {
  return (
    <Modal transparent animationType="fade" visible={loading}>
      <S.ModalBackground>
        <S.ActivityIndicatorWrapper>
          <ActivityIndicator size="large" animating={loading} color="#4ccbf8" />
        </S.ActivityIndicatorWrapper>
      </S.ModalBackground>
    </Modal>
  );
};
