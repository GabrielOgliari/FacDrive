import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { MainTemplate } from '../../components/templates/Main';
import { Button } from '../../components/UI/atoms/Button';
import { Loader } from '../../components/UI/atoms/Loader';
import { Fields } from '../../components/UI/organisms/Fields/root';
import { useUser } from '../../context/useUser';
import { dispatchToast } from '../../helpers/dispatchToast';
import { useForm } from '../../hooks/useForm';
import authenticationService from '../../services/authentication/authentication-service';
import userService from '../../services/user/user-service';
import { width } from '../../utils/dimensions';
import { isEmpty } from '../../utils/validators/isEmpty';
import { isValidInstitutionalEmail } from '../../utils/validators/isValidInstitutionalEmail';

type LoginForm = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const { navigate } = useNavigation();
  const { setUser } = useUser();

  const { mutateAsync: getUserData } = useMutation({
    mutationFn: (userId?: number) => userService.getData(userId),
    onSuccess: ({ id, isDriver, name }) => {
      setUser({ id, isDriver, name });
      navigate('bottom-tabs');
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      const email = watch('email') as string;
      const password = watch('password') as string;
      return authenticationService.login({
        email,
        password,
      });
    },
    onSuccess: ({ userId }) => {
      getUserData(userId);
    },
    onError: () => {
      dispatchToast({
        title: 'Email ou senha incorretos.',
        type: 'error',
      });
    },
  });

  const { register, watch, applyValidations } = useForm<LoginForm>({
    validations: {
      email: value => {
        if (isEmpty(value)) return 'Por favor, insira o seu e-mail.';
        if (!isValidInstitutionalEmail(value))
          return 'Por favor, insira um e-mail válido.';
      },
      password: value => {
        if (isEmpty(value)) return 'Por favor, insira a sua senha.';
      },
    },
  });

  const handlePressEntryButton = () => {
    if (!applyValidations()) {
      dispatchToast({
        title: 'Preencha os campos corretamente!',
        type: 'error',
      });

      return;
    }

    mutate();
  };

  return (
    <>
      {isLoading && <Loader />}

      <MainTemplate title="Login">
        <View style={{ gap: width * 0.08 }}>
          <Fields.Input placeholder="Email" {...register('email')} />

          <Fields.Input
            placeholder="Senha"
            mode="password"
            {...register('password')}
          />
        </View>

        <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
          <Button
            label="Entrar"
            labelColor="white"
            backgroundColor="#002039"
            onPress={handlePressEntryButton}
          />
        </View>
      </MainTemplate>
    </>
  );
};
