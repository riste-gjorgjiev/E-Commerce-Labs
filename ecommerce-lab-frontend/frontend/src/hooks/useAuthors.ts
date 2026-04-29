import { useState, useEffect } from 'react';
import { AuthorRepository } from '../repository/AuthorRepository';
import type { Author } from '../types';

export const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        AuthorRepository.getAll()
            .then(setAuthors)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { authors, loading };
};