import { launchImageLibrary } from 'react-native-image-picker';
import * as S from './styles';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

export const ProfileImage = ({ imageSrc }) => {
    // TODO Get the image from the back-end api
    const [imageData, setImageData] = useState(null);

    const fetchImage = async () => {
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result.split(',')[1];
                setImageData(base64data);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error fetching the image:', error);
        }
    };

    useEffect(() => {
        fetchImage();
    }, []);

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image Picker Error: ', response.errorMessage);
            } else {
                setImageData(response.assets[0].base64);
                // TODO Send the image to the back-end API
            }
        });
    };

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
