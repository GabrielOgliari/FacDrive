import * as S from './styles';

interface RiderProps {
    name: string;
    surname: string;
    userimage: string
}

export const Riders = ({ name, surname, userimage }: RiderProps) => {
    const image  = userimage != 'null' && userimage ? userimage : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqjHyLaaUPOqbkYNiYHd7j5402wQluQDeHQg&s`;

    return (
        <S.User>
            <S.InfoView>
                <S.UserImage resizeMode={'contain'} source={{ uri: image}}/>
                <S.Username>{name} {surname}</S.Username>
            </S.InfoView>
        </S.User>
    );
};
