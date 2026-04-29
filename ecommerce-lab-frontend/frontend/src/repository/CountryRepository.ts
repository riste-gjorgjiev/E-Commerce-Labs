import axiosInstance from '../api/axiosInstance';
import type { Country } from '../types';

export const CountryRepository = {
    getAll: async (): Promise<Country[]> => {
        const response = await axiosInstance.get<Country[]>('/countries');
        return response.data;
    }
};