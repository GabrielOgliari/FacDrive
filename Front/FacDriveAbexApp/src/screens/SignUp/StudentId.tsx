import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMutation } from 'react-query';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { FetchDataButton } from '../../components/UI/atoms/FetchDataButton';
import { FullScreenLoader } from '../../components/UI/atoms/FullScreenLoader';
import { useFormStateContext } from '../../context/useFormStateContext';
import { dispatchToast } from '../../helpers/dispatchToast';
import signUpService from '../../services/sign-up/sign-up-service';
import { ValidStudentIdResponse } from '../../services/sign-up/types/valid-student-id';
import { width } from '../../utils/dimensions';
import { ProgressCar } from './components/ProgressCar';

export const StudentId = () => {
  const { setObject } = useFormStateContext();

  const { navigate } = useNavigation();

  const [base64, setBase64] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      ({ didCancel, errorCode, assets }) => {
        if (didCancel) {
          dispatchToast('Seleção de imagem cancelada.');
          return;
        }
        if (errorCode) {
          dispatchToast(`Erro ao selecionar imagem: ${errorCode}`);
          return;
        }
        if (assets && assets[0].base64) {
          setCurrentImage(assets[0].uri ?? '');
          setBase64(assets[0].base64);
        }
      },
    );
  };

  const validStudentIdMutation = useMutation({
    mutationFn: () => signUpService.validStudentId(base64),
    onSuccess: (data: ValidStudentIdResponse) => {
      const isVerified = data.status === 'Aluno Regular';
      dispatchToast(isVerified ? 'Aluno Regular.' : 'Aluno Irregular.');

      if (isVerified) {
        setObject('STUDENT_ID', data);
        navigate('PERSONAL_DETAILS');
      }
    },
    onError: error => {
      dispatchToast('Erro ao verificar Aluno. Tente novamente.');
      console.error(error);
    },
  });

  const handlePressContinueButton = async () => {
    if (!base64) {
      dispatchToast(
        'Por favor, selecione uma imagem da carteirinha de estudante.',
      );
      return;
    }

    validStudentIdMutation.mutateAsync();
  };

  return (
    <Container title="Identificação do Estudante">
      <FullScreenLoader loading={validStudentIdMutation.isLoading} />

      <FetchDataButton
        onPress={handleImagePicker}
        label={currentImage ? currentImage : 'Carteirinha de estudante'}
        iconName="upload"
      />

      <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
        <ProgressCar currentStep={2} totalSteps={5} />

        <Button
          backgroundColor="#4ccbf8"
          label="Continuar"
          labelColor="black"
          onPress={handlePressContinueButton}
          disabled={!base64}
        />
      </View>
    </Container>
  );
};
