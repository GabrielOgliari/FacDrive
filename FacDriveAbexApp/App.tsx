import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FormStateProvider } from './src/context/useFormStateContext.tsx';
import { UserProvider } from './src/context/useUser.tsx';
import { Navigator } from './src/navigation/Navigation.tsx';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FormStateProvider>
          <UserProvider>
            <Navigator />
          </UserProvider>
        </FormStateProvider>
      </QueryClientProvider>

      <Toast />
    </>
  );
};
