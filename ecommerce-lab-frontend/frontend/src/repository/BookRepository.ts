import axiosInstance from "../api/axiosInstance.ts";
import type {Book} from '../types';

export const BookRepository = {
    getAll: async (): Promise<Book[]> => {
        const response = await axiosInstance.get<Book[]>('/books');
        return response.data;
    },
    getById: async (id: number): Promise<Book> => {
        const response = await axiosInstance.get<Book>(`/books/${id}`);
        return response.data;
    }
};