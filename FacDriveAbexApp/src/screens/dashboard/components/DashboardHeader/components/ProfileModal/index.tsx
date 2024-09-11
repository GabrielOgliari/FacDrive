import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMutation } from 'react-query';
import { dispatchToast } from '../../../../../../helpers/dispatchToast';
import dashboardService from '../../../../../../services/dashboard/dashboard-service';
import { ChangeImageContainer } from './components/ChangeImageContainer';
import { LogoutButton } from './components/LogoutButton';
import * as S from './styles';

type ProfileModalProps = {
  open: boolean;
  onClose: () => void;
  srcImage: string | undefined;
  onUpdateImage: () => void;
  userId: number | null;
};

export const ProfileModal = ({
  open,
  onClose,
  srcImage,
  onUpdateImage,
  userId,
}: ProfileModalProps) => {
  const { navigate } = useNavigation();
  const [base64, setBase64] = useState('');

  const setPerfilImageMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !base64) return;
      return dashboardService.setPerfilImage({ id: userId, image: base64 });
    },
    onSuccess: () => {
      dispatchToast({
        title: 'Imagem de perfil atualizada com sucesso!',
        type: 'success',
      });
      onUpdateImage();
    },
    onError: () => {
      dispatchToast({
        title: 'Erro ao atualizar a imagem de perfil.',
        type: 'error',
      });
    },
  });

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      ({ didCancel, errorCode, assets }) => {
        if (didCancel) {
          dispatchToast({
            title: 'Seleção de imagem cancelada.',
            type: 'info',
          });
          return;
        }
        if (errorCode) {
          dispatchToast({
            title: `Erro ao selecionar imagem: ${errorCode}`,
            type: 'error',
          });
          return;
        }
        if (assets && assets[0].base64) {
          setBase64(assets[0].base64);
          setPerfilImageMutation.mutate();
        }
      },
    );
  };

  const handleLogout = () => {
    navigate('presentation');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <S.ModalContainer>
        <S.ModalView>
          <ChangeImageContainer
            onPress={handleImagePicker}
            srcImage={srcImage}
            srcBase64={base64}
          />
          <LogoutButton onLogout={handleLogout} />
        </S.ModalView>
      </S.ModalContainer>
    </Modal>
  );
};
