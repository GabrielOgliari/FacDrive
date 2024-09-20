import { AppTitle } from './components/AppTitle';
import { ChargeButton } from './components/ChargeButton';
import * as S from './styles';

export const DashboardHeader = () => {
  return (
    <>
      <S.DashboardHeader>
        <AppTitle />

        <S.Flex>
          <ChargeButton onCharge={() => {}} />
        </S.Flex>
      </S.DashboardHeader>
    </>
  );
};
