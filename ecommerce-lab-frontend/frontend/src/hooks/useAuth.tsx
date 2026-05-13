import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AuthRepository } from '../repository/AuthRepository';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types';

const TOKEN_KEY = 'jwt_token';
const ROLE_KEY = 'user_role';
const USERNAME_KEY = 'username';

type AuthContextValue = {
    token: string | null;
    role: string | null;
    username: string | null;
    isAuthenticated: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
    const [role, setRole] = useState<string | null>(() => localStorage.getItem(ROLE_KEY));
    const [username, setUsername] = useState<string | null>(() => localStorage.getItem(USERNAME_KEY));

    const applyAuth = useCallback((response: AuthResponse) => {
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(ROLE_KEY, response.role);
        localStorage.setItem(USERNAME_KEY, response.username);
        setToken(response.token);
        setRole(response.role);
        setUsername(response.username);
    }, []);

    const login = useCallback(async (payload: LoginPayload) => {
        const response = await AuthRepository.login(payload);
        applyAuth(response);
    }, [applyAuth]);

    const register = useCallback(async (payload: RegisterPayload) => {
        const response = await AuthRepository.register(payload);
        applyAuth(response);
    }, [applyAuth]);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
        localStorage.removeItem(USERNAME_KEY);
        setToken(null);
        setRole(null);
        setUsername(null);
    }, []);

    const value = useMemo(() => ({
        token,
        role,
        username,
        isAuthenticated: Boolean(token),
        login,
        register,
        logout
    }), [token, role, username, login, register, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
