import React, { useEffect, useState } from 'react';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Alert } from '../../components/Alert/index.tsx';
import { FetchDataButton } from '../../components/FetchDataButton/index.tsx';
import { LoadingCar } from '../../components/LoadingCar/index.tsx';
import * as Styles from './styles.ts';

export const StudentIdValidationScreen = () => {
  const [base64, setBase64] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [studentCard, setStudentCard] = useState({});
  const [showAlert, setShowAlert] = useState<{
    visible: boolean;
    success: boolean;
  }>({ visible: false, success: false });

  const ImagePicker = () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        return;
      }
      if (response.assets) {
        setCurrentImage(response.assets[0].uri);
        setBase64(response.assets[0].base64);
      }
    });
  };

  useEffect(() => {
    if (base64) {
      const getInfosByStudent = async () => {
        let response = await fetch(
          'https://b823ec66-6721-47c2-a272-dd9e978532df-00-2zppobftqj07f.riker.replit.dev:8080/imagem',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64 }),
          },
        );
        const data = await response.json();
        setStudentCard({ card: data });
        return data;
      };
      getInfosByStudent().then(data => {
        if (data) {
          setShowAlert({ success: true, visible: true });
        } else {
          setShowAlert({ success: false, visible: true });
        }
        setTimeout(() => {
          setShowAlert({ success: false, visible: false });
        }, 4000);
      });
    }
  }, [base64]);

  return (
    <Styles.SignUpContainer>
      {showAlert.visible && <Alert success={showAlert.success} />}
      <Styles.ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
      >
        <Styles.ScreenLabel>Informações adicionais</Styles.ScreenLabel>

        <FetchDataButton
          onPress={ImagePicker}
          label={currentImage ? currentImage : 'Carteirinha de estudante'}
          iconName="upload"
        />

        <LoadingCar iniciaLeft={170} finalLeft={230} />

        {/* <Button
          backGroundColor="#4ccbf8"
          label="Cadastrar"
          labelColor="black"
          onPress={() => navigate('AddressRegistration')}
        /> */}
      </Styles.ScrollViewContainer>
    </Styles.SignUpContainer>
  );
};
