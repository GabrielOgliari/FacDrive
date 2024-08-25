import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useMutation } from 'react-query';
import { Button } from '../../components/UI/atoms/Button';
import { Container } from '../../components/UI/atoms/Container';
import { FullScreenLoader } from '../../components/UI/atoms/FullScreenLoader';
import { Fields } from '../../components/UI/organisms/Fields/root';
import { dispatchToast } from '../../helpers/dispatchToast';
import { useForm } from '../../hooks/useForm';
import authenticationService from '../../services/authentication/authentication-service';
import { width } from '../../utils/dimensions';
import { isEmpty } from '../../utils/validators/isEmpty';
import { isValidInstitutionalEmail } from '../../utils/validators/isValidInstitutionalEmail';

type LoginForm = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const { navigate } = useNavigation();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => {
      const email = watch('email') as string;
      const password = watch('password') as string;
      return authenticationService.login({ email, password });
    },
    onSuccess: ({ success, userId }) => {
      if (success) {
        navigate('dashboard');
        console.log(userId); // Setar globalmente
      }
    },
    onError: () => {
      dispatchToast({
        title: 'Não foi possível realizar o login!',
        description: 'Tente novamente mais tarde',
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

    mutateAsync();
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}

      <Container title="Login">
        <View style={{ gap: width * 0.08 }}>
          <Fields.Input placeholder="Email" {...register('email')} />

          <Fields.Input placeholder="Senha" {...register('password')} />
        </View>

        <View style={{ gap: width * 0.08, marginBottom: width * 0.08 }}>
          <Button
            label="Entrar"
            labelColor="white"
            backgroundColor="#002039"
            onPress={handlePressEntryButton}
          />
        </View>
      </Container>
    </>
  );
};
