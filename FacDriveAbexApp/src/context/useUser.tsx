import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  id?: number;
  name?: string;
  isDriver?: boolean;
};

type UserContextProps = {
  user: User;
  setUser: (props: User) => void;
  resetUser: () => void;
};

const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [object, setObject] = useState<User>({});

  const setUser = (props: User) => {
    setObject(props);
  };

  const resetUser = () => {
    setObject({});
  };

  return (
    <UserContext.Provider value={{ user: object, setUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
