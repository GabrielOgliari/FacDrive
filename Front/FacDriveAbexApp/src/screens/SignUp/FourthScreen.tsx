import React, {useEffect, useState} from 'react';
import {
  SignUpContainer,
  ScreenLabel,
  InputsView,
  ScrollViewContainer,
} from './styles.ts';
import {CustomInput} from '../../components/CustomInput';
import {LoadingCar} from '../../components/LoadingCar';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {FetchDataButton} from '../../components/FetchDataButton';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Alert} from '../../components/Alert';

const FourthScreen: React.FC = () => {
  const navigation = useNavigation();
  const [base64, setBase64] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [studentCard, setStudentCard] = useState({});
  const [showAlert, setShowAlert] = useState<{
    visible: boolean;
    sucsess: boolean;
  }>({visible: false, sucsess: false});
  const navigateToSignUp = () => {
    navigation.navigate('SecundScreen');
  };

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
            body: JSON.stringify({image: base64}),
          },
        );
        const data = await response.json();
        setStudentCard({card: data});
        return data;
      };
      getInfosByStudent().then(data => {
        if (data) {
          setShowAlert({sucsess: true, visible: true});
        } else {
          setShowAlert({sucsess: false, visible: true});
        }
        setTimeout(() => {
          setShowAlert({sucsess: false, visible: false});
        }, 4000);
      });
    }
  }, [base64]);

  return (
    <SignUpContainer>
      {showAlert.visible && <Alert sucsess={showAlert.sucsess} />}
      <ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}>
        <ScreenLabel>Informações adicionais</ScreenLabel>
        <FetchDataButton
          onPress={ImagePicker}
          label={currentImage ? currentImage : 'Carteirinha de estudante'}
          iconName={'upload'}
        />
        <LoadingCar iniciaLeft={170} finalLeft={230} />
        <CustomButton
          backGroundColor={'#4ccbf8'}
          label={'Cadastrar'}
          labelColor={'black'}
          onPress={navigateToSignUp}
        />
      </ScrollViewContainer>
    </SignUpContainer>
  );
};

export {FourthScreen};
