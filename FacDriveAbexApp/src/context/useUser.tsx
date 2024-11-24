import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import StorageService from '../services/storage-service/storage-service.ts';
import UserService from "../services/user/user-service.ts";

type User = {
    id?: number;
    name?: string;
    isDriver?: boolean;
};

type UserContextProps = {
    user: User;
    setUser: (user: User) => void
    loading: boolean;
    resetUser: () => void;
};

const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User>({});
    const [loading, setLoading] = useState(true);

    const resetUser = () => {
        setUserState({});
        StorageService.remove('userProps');
    };

    const setUser = (user: User) => {
        StorageService.set('userProps', user);
        setUserState(user)
    }

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await StorageService.get('userProps');
            if (storedUser) {
                const userService = await UserService.getData(storedUser.id)
                setUserState(userService);
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, setUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
