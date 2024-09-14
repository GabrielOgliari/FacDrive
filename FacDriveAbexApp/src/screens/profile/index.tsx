import * as S from './styles';
import { Card } from './components/card';
import { ProfileImage } from './components/Image';
import { Item } from './components/Item';
import { Separator } from './components/Separator';

export const ProfileScreen = () => {
    return (
        <S.Body>
            <ProfileImage imageSrc="https://img.freepik.com/fotos-gratis/homem-retrato-rindo_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725580800&semt=ais_hybrid" />
            <Card name="Matheus Eickhoff" role="Caroneiro" />

            <Separator space={20}/>
            <Item title="Marca do carro" content="Fiat" icon="car" />
            <Item title="Universidade" content="Unochapecó" icon="book" />
            <Item title="Idade" content="Fiat" icon="calendar-number" />
        </S.Body>
    );
};
