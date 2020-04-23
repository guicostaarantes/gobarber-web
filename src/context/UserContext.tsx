import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface UserContextData {
  token: string;
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>(() => {
    const lsToken = localStorage.getItem('token');
    return lsToken || '';
  });

  const [user, setUser] = useState<object>(() => {
    const lsUser = localStorage.getItem('user');
    if (lsUser) {
      return JSON.parse(lsUser);
    }
    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response1 = await api.post('sessions', { email, password });
    localStorage.setItem('token', response1.data.token);
    setToken(response1.data.token);

    const response2 = await api.get('users/me', {
      headers: { Authorization: `Bearer ${response1.data.token}` },
    });
    localStorage.setItem('user', JSON.stringify(response2.data));
    setUser(response2.data);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setToken('');
    localStorage.removeItem('user');
    setUser({});
  }, []);

  return (
    <UserContext.Provider value={{ user, token, signIn, signOut }}>
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
