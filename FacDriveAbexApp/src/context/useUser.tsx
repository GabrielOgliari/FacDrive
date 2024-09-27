import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  id?: number;
};

type UserContextProps = {
  user: User;
  setUser: (props: User) => void;
};

const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [object, setObject] = useState<User>({});

  const setUser = (props: User) => {
    setObject(props);
  };

  return (
    <UserContext.Provider value={{ user: object, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
