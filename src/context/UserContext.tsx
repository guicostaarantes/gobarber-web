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

interface SupplierData {
  name: string;
  latitude: number;
  longitude: number;
}

interface UserContextData {
  token: string;
  user: UserData | undefined;
  supplier: SupplierData | undefined;
  signIn(credentials: SignInCredentials): Promise<void>;
  getUser(): Promise<void>;
  getSupplier(): Promise<void>;
  signOut(): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>(() => {
    const lsToken = localStorage.getItem('token');
    if (lsToken) api.defaults.headers.authorization = `Bearer ${lsToken}`;
    return lsToken || '';
  });

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [supplier, setSupplier] = useState<SupplierData | undefined>(undefined);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    localStorage.setItem('token', response.data.token);
    api.defaults.headers.authorization = `Bearer ${response.data.token}`;
    setToken(response.data.token);
  }, []);

  const getUser = useCallback(async () => {
    const response = await api.get('users/me');
    setUser(response.data);
  }, []);

  const getSupplier = useCallback(async () => {
    const response = await api.get('suppliers/me');
    setSupplier(response.data);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    api.defaults.headers.authorization = undefined;
    setToken('');
    setUser(undefined);
    setSupplier(undefined);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, supplier, token, signIn, signOut, getUser, getSupplier }}
    >
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
