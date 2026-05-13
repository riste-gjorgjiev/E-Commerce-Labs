import axiosInstance from '../api/axiosInstance';
import type { UserPreference } from '../types';

export const UserPreferenceRepository = {
    get: async (): Promise<UserPreference> => {
        const response = await axiosInstance.get<UserPreference>('/user-preferences');
        return response.data;
    },
    update: async (payload: UserPreference): Promise<UserPreference> => {
        const response = await axiosInstance.put<UserPreference>('/user-preferences', payload);
        return response.data;
    }
};
