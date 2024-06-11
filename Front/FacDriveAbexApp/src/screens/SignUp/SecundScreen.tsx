import React, { useEffect, useState } from "react";
import {
  SignUpContainer,
  ScreenLabel,
  InputsView,
  ScrollViewContainer,
  HalfInputView,
} from './styles.ts';
import {CustomInput} from '../../components/CustomInput';
import {LoadingCar} from '../../components/LoadingCar';
import {CustomButton} from '../../components/CustomButton';
import {View} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SecundScreen: React.FC = () => {
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [rua, setRua] = useState('');

  const navigation = useNavigation();
  const navigateToSignUp = () => {
    navigation.navigate('ThirdScreen');
  };

  useEffect(() => {
    if(cep.length === 8){
      const getCepInformation = async () => {
        let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        response = await response.json();
        setCity(response?.localidade);
        setState(response?.uf);
        setRua(response.logradouro);
        setNeighborhood(response.bairro);
      }

      getCepInformation();
    }
  }, [cep]);

  return (
    <SignUpContainer>
      <ScrollViewContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}>
        <ScreenLabel>Prosseguindo com o{'\n'}cadastro</ScreenLabel>
        <InputsView>
          <CustomInput value={cep} onChangeText={setCep} placeHolder={'CEP  ex: 12345-678'} keyboardType={'numeric'}/>
          <HalfInputView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomInput
                value={state}
                onChangeText={setState}
                placeHolder={'Estado'}
                blocked={true}
                halfInput={true}
              />
              <CustomInput
                value={city}
                onChangeText={setCity}
                placeHolder={'Cidade'}
                blocked={true}
                halfInput={true}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomInput
                value={neighborhood}
                onChangeText={setNeighborhood}
                placeHolder={'Bairro'}
                halfInput={true}
              />
              <CustomInput
                value={houseNumber}
                onChangeText={setHouseNumber}
                placeHolder={'N° da residência'}
                halfInput={true}
              />
            </View>
          </HalfInputView>
          <CustomInput
            value={rua}
            onChangeText={setRua}
            placeHolder={'Rua'}
          />
          <CustomInput
            value={complement}
            onChangeText={setComplement}
            placeHolder={'Complemento (opcional)'}
          />
        </InputsView>
        <LoadingCar iniciaLeft={0} finalLeft={100} />
        <CustomButton
          backGroundColor={'#4ccbf8'}
          label={'Continuar'}
          labelColor={'black'}
          onPress={navigateToSignUp}
        />
      </ScrollViewContainer>
    </SignUpContainer>
  );
};

export {SecundScreen};
