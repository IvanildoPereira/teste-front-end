import { createContext } from 'react';
import UserAuth from '../types/UserAuth';

type AuthContextType = {
    isLoggedIn: boolean, 
    user: UserAuth | null,
    login: (user: UserAuth, expiresAt: Date) => void, 
    logout: () => void,
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false, 
    user: null,
    login: (user: UserAuth, expiresAt: Date) => {}, 
    logout: () => {},
});