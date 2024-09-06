import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal } from 'react-native';
import { LogoutButton } from './components/LogoutButton';
import * as S from './styles';

type ProfileModalProps = {
  open: boolean;
  close: () => void;
};

export const ProfileModal = ({ open, close }: ProfileModalProps) => {
  const { navigate } = useNavigation();

  const handleLogout = () => {
    navigate('presentation');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={close}
    >
      <S.ModalContainer>
        <S.ModalView>
          <LogoutButton onLogout={handleLogout} />
        </S.ModalView>
      </S.ModalContainer>
    </Modal>
  );
};
