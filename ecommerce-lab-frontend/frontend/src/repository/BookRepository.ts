import axiosInstance from "../api/axiosInstance.ts";
import type {Book, BookPayload} from '../types';

export const BookRepository = {
    getAll: async (): Promise<Book[]> => {
        const response = await axiosInstance.get<Book[]>('/books');
        return response.data;
    },
    getById: async (id: number): Promise<Book> => {
        const response = await axiosInstance.get<Book>(`/books/${id}`);
        return response.data;
    },
    create: async (payload: BookPayload): Promise<Book> => {
        const response = await axiosInstance.post<Book>('/books/add', payload);
        return response.data;
    },
    update: async (id: number, payload: BookPayload): Promise<Book> => {
        const response = await axiosInstance.put<Book>(`/books/edit/${id}`, payload);
        return response.data;
    },
    remove: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/books/delete/${id}`);
    }
};
