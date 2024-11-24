import { CarpoolDays } from './components/CarpoolDays';
import { Confirmation } from './components/Confirmation';
import { DashboardHeader } from './components/DashboardHeader';
import { RideOptions } from './components/RideOptions';
import { Welcome } from './components/Welcome';
import * as S from './styles';
import {useUser} from "../../context/useUser.tsx";
import {DriverOptions} from "./components/DiverOptions";

export const DashboardScreen = () => {
    const handleConfirm = () => {};

    const handleCancel = () => {};

    const user = useUser();

    return (
        <>
            <DashboardHeader />

            <S.Body>
                <S.Content>
                    <Welcome />

                    {! user.user.isDriver && <Confirmation onConfirm={handleConfirm} onCancel={handleCancel} />}

                    <CarpoolDays />

                    {! user.user.isDriver && <RideOptions />}
                    {user.user.isDriver && <DriverOptions />}
                </S.Content>
            </S.Body>
        </>
    );
};
