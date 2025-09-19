import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  showTutorialFor: Role | null;
  setShowTutorialFor: (role: Role | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  showTutorialFor: null,
  setShowTutorialFor: () => {},
});

// FIX: Add AuthProvider to manage authentication state
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showTutorialFor, setShowTutorialFor] = useState<Role | null>(null);

  const login = useCallback((role: Role) => {
    if (role === Role.ADMIN) {
      setUser({
        id: 'admin-001',
        name: 'Alex Admin',
        role: Role.ADMIN,
        avatar: 'https://i.pravatar.cc/150?u=admin-alex',
      });
    } else if (role === Role.MUSIC_CREATOR) {
      setUser({
        id: 'creator-001',
        name: 'Casey Creator',
        role: Role.MUSIC_CREATOR,
        avatar: 'https://i.pravatar.cc/150?u=casey-creator',
      });
    } else { // BOOK_AUTHOR
      setUser({
        id: 'author-001',
        name: 'Pat Publisher',
        role: Role.BOOK_AUTHOR,
        avatar: 'https://i.pravatar.cc/150?u=pat-publisher',
      });
    }
    setShowTutorialFor(role);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setShowTutorialFor(null);
  }, []);

  const updateUser = useCallback((updatedData: Partial<User>) => {
    setUser(currentUser => currentUser ? { ...currentUser, ...updatedData } : null);
  }, []);

  return React.createElement(AuthContext.Provider, { value: { user, login, logout, updateUser, showTutorialFor, setShowTutorialFor } }, children);
};


interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: 'success' | 'error') => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

let toastCount = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = toastCount++;
    setToasts(currentToasts => [...currentToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }, []);

  return React.createElement(ToastContext.Provider, { value: { toasts, addToast, removeToast } }, children);
};