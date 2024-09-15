import * as S from './styles';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ProfileImage = ({ imageData, selectImage }) => {
    if (!imageData) {
        return (
            <S.Body>
                <TouchableOpacity onPress={selectImage}>
                    <S.Warper>
                        <Icon name="user" size={180} color="#0082c8" />
                    </S.Warper>
                </TouchableOpacity>
            </S.Body>
        );
    }

    return (
        <S.Body>
            <TouchableOpacity onPress={selectImage}>
                <S.Warper>
                    <S.Image
                        source={{
                            uri: `data:image/;base64,${imageData}`,
                        }}
                    />
                </S.Warper>
            </TouchableOpacity>
        </S.Body>
    );
};
