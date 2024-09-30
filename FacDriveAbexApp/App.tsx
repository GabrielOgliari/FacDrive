import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FormStateProvider } from './src/context/useFormStateContext.tsx';
import { Navigator } from './src/navigation/Navigation.tsx';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {useEffect} from "react";

const queryClient = new QueryClient();

export const App = () => {

    const requestNotificationPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {}
    };

    useEffect(() => {
        requestNotificationPermission().then(resp => console.log(resp));
    }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FormStateProvider>
          <Navigator />
        </FormStateProvider>
      </QueryClientProvider>

      <Toast />
    </>
  );
};
