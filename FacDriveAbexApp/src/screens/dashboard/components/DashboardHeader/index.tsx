import { useToggle } from '@uidotdev/usehooks';
import { useQuery } from 'react-query';
import dashboardService from '../../../../services/dashboard/dashboard-service';
import { AppTitle } from './components/AppTitle';
import { ChargeButton } from './components/ChargeButton';
import { ProfileButton } from './components/ProfileButton';
import { ProfileModal } from './components/ProfileModal';
import * as S from './styles';

export const DashboardHeader = () => {
  const [open, toggle] = useToggle(false);
  // const [userId, setUserId] = useState<number | null>(null);

  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const id = await StorageService.get('user_id');
  //       setUserId(Number(id));
  //     } catch (error) {
  //       console.error('Erro ao buscar user_id', error);
  //     }
  //   };
  //   fetchUserId();
  // }, []);

  const userId = 78;

  const { data, refetch } = useQuery({
    queryKey: ['get-perfil-image', userId],
    queryFn: () => dashboardService.getPerfilImage(userId as number),
    enabled: !!userId,
  });

  const handleCharge = () => {};

  const handleProfile = () => {
    toggle();
  };

  return (
    <>
      <S.DashboardHeader>
        <AppTitle />

        <S.Flex>
          <ChargeButton onCharge={handleCharge} />
          <ProfileButton onProfile={handleProfile} srcImage={data?.userImage} />
        </S.Flex>
      </S.DashboardHeader>

      <ProfileModal
        open={open}
        close={toggle}
        srcImage={data?.userImage}
        onUpdateImage={refetch}
        userId={userId}
      />
    </>
  );
};
