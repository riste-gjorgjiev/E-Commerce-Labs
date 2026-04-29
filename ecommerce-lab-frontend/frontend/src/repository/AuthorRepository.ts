import axiosInstance from "../api/axiosInstance.ts";
import type { Author } from "../types";

export const AuthorRepository = {
    getAll: async (): Promise<Author[]> => {
        const response = await axiosInstance.get<Author[]>('/authors');
        return response.data;
    }
};