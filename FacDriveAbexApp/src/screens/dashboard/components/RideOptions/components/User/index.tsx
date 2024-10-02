import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import * as S from './styles';

interface UserProps {
  name: string;
  days: number;
  userId: number;
  setAllState: any;
}

export const User = ({ name, days, userId, setAllState }: UserProps) => {
  const currentUserId: number = 79;

  const removeFromArray = () => {
    setAllState(prev => {
      const newArray = [...prev];

      return newArray.filter(item => item.userId != userId);
    });
  };

  const acceptRide = () => {
    const apiNodeUrl = process.env.API_NODE_URL;
    axios
      .post(apiNodeUrl + '/relationship', {
        driverId: currentUserId,
        riderId: userId,
        amount: 0.0,
      })
      .then(() => removeFromArray());
  };

  const rejectRide = () => {
    removeFromArray();
  };

  return (
    <S.User>
      <S.InfoView>
        <S.Username>{name}</S.Username>
        <S.CommunDays>{days} Dias em comum</S.CommunDays>
      </S.InfoView>

      <S.ButtonsView>
        <S.Button onPress={acceptRide}>
          <Icon size={20} color="green" name="checkcircleo" />
        </S.Button>

        <S.Button onPress={rejectRide}>
          <Icon size={20} color="red" name="frowno" />
        </S.Button>
      </S.ButtonsView>
    </S.User>
  );
};
