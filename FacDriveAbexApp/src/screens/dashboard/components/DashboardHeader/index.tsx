import { useNavigation } from '@react-navigation/native';
import { AppTitle } from './components/AppTitle';
import { ChargeButton } from './components/ChargeButton';
import * as S from './styles';

export const DashboardHeader = () => {
    const { navigate } = useNavigation();
    return (
        <>
            <S.DashboardHeader>
                <AppTitle />

                <S.Flex>
                    <ChargeButton
                        onCharge={() => {
                            navigate('relations');
                        }}
                    />
                </S.Flex>
            </S.DashboardHeader>
        </>
    );
};
