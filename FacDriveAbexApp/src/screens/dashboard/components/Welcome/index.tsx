import { useMemo } from 'react';

import { Text } from '../../../../components/UI/atoms/Text';
import { WelcomeMessages } from '../../../../constants/welcome-messages';
import { Container } from '../Container';

export const Welcome = () => {
  const randomIndex = Math.floor(Math.random() * WelcomeMessages.length);
  const randomMessage = WelcomeMessages[randomIndex];
  const randomMessageMemorized = useMemo(() => randomMessage, []);

  return (
    <Container>
      <Text type="subtitle">{randomMessageMemorized}</Text>
      <Text>Caronas rápidas e seguras para universitários.</Text>
    </Container>
  );
};
