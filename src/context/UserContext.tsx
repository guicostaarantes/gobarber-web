import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserData {
  fullName: string;
  email: string;
  avatar?: string;
}

interface UserContextData {
  token: string;
  user: UserData | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  getUser(token: string): Promise<void>;
  signOut(): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>(() => {
    const lsToken = localStorage.getItem('token');
    return lsToken || '';
  });

  const [user, setUser] = useState<UserData | null>(() => {
    const lsUser = localStorage.getItem('user');
    if (lsUser) {
      return JSON.parse(lsUser);
    }
    return null;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    localStorage.setItem('token', response.data.token);
    setToken(response.data.token);
  }, []);

  const getUser = useCallback(async (token_) => {
    const response = await api.get('users/me', {
      headers: { Authorization: `Bearer ${token_}` },
    });
    setUser(response.data);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, token, signIn, signOut, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser hook must be used inside a UserProvider.');
  }

  return context;
}
