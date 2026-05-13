import { useState, useEffect, useCallback } from 'react';
import { AuthorRepository } from '../repository/AuthorRepository';
import type { Author, AuthorPayload } from '../types';

export const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAuthors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthorRepository.getAll();
            setAuthors(data);
        } catch (fetchError) {
            console.error(fetchError);
            setError('Failed to fetch authors.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAuthors();
    }, [fetchAuthors]);

    const createAuthor = async (payload: AuthorPayload) => {
        await AuthorRepository.create(payload);
        await fetchAuthors();
    };

    const updateAuthor = async (id: number, payload: AuthorPayload) => {
        await AuthorRepository.update(id, payload);
        await fetchAuthors();
    };

    const deleteAuthor = async (id: number) => {
        await AuthorRepository.remove(id);
        await fetchAuthors();
    };

    return {
        authors,
        loading,
        error,
        refetch: fetchAuthors,
        createAuthor,
        updateAuthor,
        deleteAuthor
    };
};
