import React, { createContext, useCallback, useState, useContext } from 'react';

import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(toast: Omit<ToastMsg, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMsg {
  id: string;
  type?: 'success' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const addToast = useCallback(({ type, title, description }) => {
    const toast = {
      id: uuid(),
      type,
      title,
      description,
    };
    setToasts((state) => [...state.slice(-2), toast]);
    setTimeout(() => {
      setToasts((state) => state.filter((s) => s.id !== toast.id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((state) => state.filter((s) => s.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast hook must be used inside a ToastProvider.');
  }

  return context;
}
