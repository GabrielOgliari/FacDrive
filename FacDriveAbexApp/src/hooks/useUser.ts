import { useRef } from 'react';
import StorageService from '../services/storage-service/storage-service';

type User = {
  id: number;
};

export const useUser = () => {
  const user = useRef<User>();

  const userIdAsync = StorageService.get('user_id');

  userIdAsync
    .then(id => (user.current = { id: Number(id) }))
    .catch(() => console.error('Erro ao obter dados do usuário.'));

  return {
    userId: user.current?.id,
  };
};
