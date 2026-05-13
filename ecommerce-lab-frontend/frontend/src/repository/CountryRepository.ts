import axiosInstance from '../api/axiosInstance';
import type { Country, CountryPayload } from '../types';

export const CountryRepository = {
    getAll: async (): Promise<Country[]> => {
        const response = await axiosInstance.get<Country[]>('/countries');
        return response.data;
    },
    create: async (payload: CountryPayload): Promise<Country> => {
        const response = await axiosInstance.post<Country>('/countries/add', payload);
        return response.data;
    },
    update: async (id: number, payload: CountryPayload): Promise<Country> => {
        const response = await axiosInstance.put<Country>(`/countries/edit/${id}`, payload);
        return response.data;
    },
    remove: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/countries/delete/${id}`);
    }
};
