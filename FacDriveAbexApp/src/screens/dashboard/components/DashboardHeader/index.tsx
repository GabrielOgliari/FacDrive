import { useToggle } from '@uidotdev/usehooks';
import { AppTitle } from './components/AppTitle';
import { ChargeButton } from './components/ChargeButton';
import { ProfileButton } from './components/ProfileButton';
import { ProfileModal } from './components/ProfileModal';
import * as S from './styles';

export const DashboardHeader = () => {
  const [open, toggle] = useToggle(false);

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
          <ProfileButton onProfile={handleProfile} />
        </S.Flex>
      </S.DashboardHeader>

      <ProfileModal open={open} close={toggle} />
    </>
  );
};
