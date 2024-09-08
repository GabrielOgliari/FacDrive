import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal } from 'react-native';
import { ChangeImageContainer } from './components/ChangeImageContainer';
import { LogoutButton } from './components/LogoutButton';
import * as S from './styles';

type ProfileModalProps = {
  open: boolean;
  close: () => void;
  srcImage?: string;
};

export const ProfileModal = ({ open, close, srcImage }: ProfileModalProps) => {
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
          <ChangeImageContainer onPress={() => {}} srcImage={srcImage} />

          <LogoutButton onLogout={handleLogout} />
        </S.ModalView>
      </S.ModalContainer>
    </Modal>
  );
};
