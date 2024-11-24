import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FormStateProvider } from './src/context/useFormStateContext.tsx';
import { UserProvider, useUser } from './src/context/useUser.tsx';
import { Navigator } from './src/navigation/Navigation.tsx';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { useEffect, useRef } from 'react';
import { NotificationManager } from "./src/services/notifications";
import storageService from "./src/services/storage-service/storage-service.ts";

const queryClient = new QueryClient();

export const App = () => {
    const notificationRef = useRef<null | NotificationManager>(null);
    const requestNotificationPermission = async () => {
        //@ts-ignore
        const result = await request('android.permission.POST_NOTIFICATIONS');
        if (result === RESULTS.GRANTED) {
        }
    };

    const checkPermission = async () => {
        //@ts-ignore
        return await check('android.permission.POST_NOTIFICATIONS');
    }

    useEffect(() => {
        requestNotificationPermission().then(() => {
            checkPermission().then(async (resp) => {
                if (! notificationRef.current) {
                    if (resp === 'granted') {
                        const userProps = await storageService.get('userProps');
                        if (userProps.id) {
                            notificationRef.current = new NotificationManager(userProps.id);
                        }
                    }
                }
            })
        });
    }, []);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <FormStateProvider>
                    <UserProvider>
                        <Content />
                    </UserProvider>
                </FormStateProvider>
            </QueryClientProvider>
            <Toast />
        </>
    );
};

const Content = () => {
    const { loading } = useUser();

    if (loading) {
        return null;
    }

    return <Navigator />;
};
