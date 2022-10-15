import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import UserAuth from '../types/UserAuth';

let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null)
  const [isLoading, setLoading] = useState(true)

  // Login
  const login = useCallback((user: UserAuth, expirateDate: Date) => {
    setExpirationDate(expirateDate);
    setUser(user);
    setLoading(false);
  }, []);

  // Logout
  const logout = useCallback(async() => {
    await axios(`${process.env.BACKEND_FOR_FRONTEND}/users/logout`, {
      withCredentials: true
    })
    setUser(null);
    setExpirationDate(null)
  }, []);

  // Auto-Logout when sessin expireted
  useEffect(() => {
    if (user && expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [user, logout, expirationDate]);

  // Auto Login
  useEffect(() =>{
    const getUser = async() =>{
      const response = await axios.get(`${process.env.BACKEND_FOR_FRONTEND}/users/login`,{
        withCredentials: true
      });
      
      if(response.data.user){
        let {name, email} = response.data.user
        let user = new UserAuth(name, email);
        let expiresAt  = new Date(response.data.expiresAt);
        login(user, expiresAt);
      };
      
      setLoading(false)
    }

    getUser();
  }, [login]);

  return { user, login, logout, isLoading };
};