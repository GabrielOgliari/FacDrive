import { useToggle } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import dashboardService from '../../../../services/dashboard/dashboard-service';
import StorageService from '../../../../services/storage-service/storage-service';
import { AppTitle } from './components/AppTitle';
import { ChargeButton } from './components/ChargeButton';
import { ProfileButton } from './components/ProfileButton';
import { ProfileModal } from './components/ProfileModal';
import * as S from './styles';

export const DashboardHeader = () => {
  const [open, toggle] = useToggle(false);
  const [userId, setUserId] = useState<number | null>(null);

  const fetchUserId = async () => {
    try {
      const storedUserId = await StorageService.get('user_id');
      return Number(storedUserId);
    } catch (error) {
      console.error('Erro ao buscar o ID do usuário:', error);
      return null;
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ['get-perfil-image', userId],
    queryFn: () => dashboardService.getPerfilImage(userId as number),
    enabled: !!userId,
  });

  useEffect(() => {
    const getUserIdAndFetchData = async () => {
      const fetchedUserId = await fetchUserId();
      if (fetchedUserId) {
        setUserId(fetchedUserId);
        refetch();
      }
    };

    getUserIdAndFetchData();
  }, [refetch]);

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

      <ProfileModal open={open} close={toggle} srcImage={data?.userImage} />
    </>
  );
};
