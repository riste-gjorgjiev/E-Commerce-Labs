import axiosInstance from "../api/axiosInstance.ts";
import type { Author, AuthorPayload } from "../types";

export const AuthorRepository = {
    getAll: async (): Promise<Author[]> => {
        const response = await axiosInstance.get<Author[]>('/authors');
        return response.data;
    },
    create: async (payload: AuthorPayload): Promise<Author> => {
        const response = await axiosInstance.post<Author>('/authors/add', payload);
        return response.data;
    },
    update: async (id: number, payload: AuthorPayload): Promise<Author> => {
        const response = await axiosInstance.put<Author>(`/authors/edit/${id}`, payload);
        return response.data;
    },
    remove: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/authors/delete/${id}`);
    }
};
