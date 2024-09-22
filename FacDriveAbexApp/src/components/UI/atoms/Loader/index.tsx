import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import * as S from './styles';

export const Loader = ({ loading = true }) => {
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
