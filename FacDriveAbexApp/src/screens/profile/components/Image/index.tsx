import * as S from './styles';

export const ProfileImage = ( { imageSrc } ) => {
    return (
        <S.Body>
            <S.Image
                source={{
                    uri: imageSrc,
                }}
            />
        </S.Body>
    );
};
