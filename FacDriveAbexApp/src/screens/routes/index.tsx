import * as S from './styles';
import {WebViewMap} from "./components/WebViewMap";
import {useEffect, useState} from "react";
import {PermissionsAndroid, Platform, Text} from "react-native";
import StorageService from "../../services/storage-service/storage-service.ts";

async function requestLocationPermission() {
    if (Platform.OS === 'android') {
        return await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "This app needs access to your location.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
    }
}

export const RoutesScreen = () => {
    const [userID, setUserID] = useState<number | null>(null);

    useEffect(() => {
        const initializeUserData = async () => {
            await requestLocationPermission();

            const resp = await StorageService.get('userProps');
            setUserID(resp?.id ?? null);
        };

        initializeUserData();
    }, []);

    return (
        <S.Body>
            {userID === null ? (
                <Text>Carregando...</Text>
            ) : (
                <WebViewMap userID={userID} />
            )}
        </S.Body>
    );
};