import { CarpoolDays } from './components/CarpoolDays';
import { Confirmation } from './components/Confirmation';
import { DashboardHeader } from './components/DashboardHeader';
import { Welcome } from './components/Welcome';
import * as S from './styles';

export const DashboardScreen = () => {
  const handleConfirm = () => {};

  const handleCancel = () => {};

  return (
    <>
      <DashboardHeader />

      <S.Body>
        <S.Content>
          <Welcome />

          <Confirmation onConfirm={handleConfirm} onCancel={handleCancel} />

          <CarpoolDays />
        </S.Content>
      </S.Body>
    </>
  );
};
