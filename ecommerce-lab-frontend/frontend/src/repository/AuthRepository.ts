import axiosInstance from '../api/axiosInstance';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types';

export const AuthRepository = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', payload);
        return response.data;
    },
    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', payload);
        return response.data;
    }
};
