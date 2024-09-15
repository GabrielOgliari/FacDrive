import * as S from './styles';
import { Card } from './components/Card';
import { ProfileImage } from './components/Image';
import { Item } from './components/Item';
import { Separator } from './components/Separator';
import { SettingsButton } from './components/SettingsButton';

export const ProfileScreen = () => {
    return (
        <S.Body>
            <SettingsButton />
            <ProfileImage imageSrc="https://img.freepik.com/fotos-gratis/homem-retrato-rindo_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1725580800&semt=ais_hybrid" />
            <Card name="Matheus Eickhoff" role="Caroneiro" />

            <Separator space={20} />

            <Item
                title="Endereço"
                content="Avenida Fernando Machado"
                icon="map-sharp"
            />
            <Item title="Universidade" content="Unochapecó" icon="book" />
            <Item title="Marca do Carro" content="Fiat" icon="car" />
            <Item title="Idade" content="18 Anos" icon="calendar-number" />
        </S.Body>
    );
};
