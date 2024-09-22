import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useMutation } from 'react-query';
import { MainTemplate } from '../../../components/templates/Main';
import { Button } from '../../../components/UI/atoms/Button';
import { FetchDataButton } from '../../../components/UI/atoms/FetchDataButton';
import { Loader } from '../../../components/UI/atoms/Loader';
import { ProgressCar } from '../../../components/UI/atoms/ProgressCar';
import { useFormStateContext } from '../../../context/useFormStateContext';
import { dispatchToast } from '../../../helpers/dispatchToast';
import signUpService from '../../../services/sign-up/sign-up-service';
import { ValidStudentIdResponse } from '../../../services/sign-up/types/valid-student-id';
import { width } from '../../../utils/dimensions';

export const StudentIdScreen = () => {
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

      if (!isVerified) {
        dispatchToast({
          title: 'Aluno Irregular.',
          type: 'error',
        });

        return;
      }

      if (isVerified) {
        setObject('student-id', data);
        navigate('personal-details');
      }
    },
    onError: () => {
      dispatchToast({
        title: 'Erro ao verificar Aluno.',
        type: 'error',
      });
    },
  });

  const handlePressContinueButton = async () => {
    if (!base64) {
      dispatchToast({
        title: 'Por favor, selecione uma imagem da carteirinha de estudante.',
        type: 'info',
      });
      return;
    }

    validStudentIdMutation.mutateAsync();
  };

  return (
    <MainTemplate title="Identificação do Estudante">
      <Loader loading={validStudentIdMutation.isLoading} />

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
    </MainTemplate>
  );
};
