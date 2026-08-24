import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthState } from '../types';
import { authApi } from '../api';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = localStorage.getItem('accessToken');
    const userJson = localStorage.getItem('user');
    if (token && userJson) {
      return {
        accessToken: token,
        refreshToken: localStorage.getItem('refreshToken'),
        user: JSON.parse(userJson),
        isAuthenticated: true,
      };
    }
    return { user: null, accessToken: null, refreshToken: null, isAuthenticated: false };
  });

  const login = async (username: string, password: string) => {
    const res = await authApi.login({ username, password });
    const data = res.data.data;
    const user: User = {
      username: data.username,
      fullName: data.fullName,
      role: data.role,
      permissions: data.permissions,
    };
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    setState({ user, accessToken: data.accessToken, refreshToken: data.refreshToken, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.clear();
    setState({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  };

  const hasPermission = (permission: string) => {
    return state.user?.permissions?.includes(permission) || state.user?.role === 'ADMIN';
  };

  const hasRole = (role: string) => state.user?.role === role;

  return (
    <AuthContext.Provider value={{ ...state, login, logout, hasPermission, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
