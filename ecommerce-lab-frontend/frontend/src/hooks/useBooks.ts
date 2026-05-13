import { useState, useEffect, useCallback } from 'react';
import { BookRepository } from '../repository/BookRepository.ts';
import type { Book, BookPayload } from '../types';

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await BookRepository.getAll();
            setBooks(data);
        } catch (fetchError) {
            console.error("Failed to fetch books.", fetchError);
            setError('Failed to fetch books.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const createBook = async (payload: BookPayload) => {
        await BookRepository.create(payload);
        await fetchBooks();
    };

    const updateBook = async (id: number, payload: BookPayload) => {
        await BookRepository.update(id, payload);
        await fetchBooks();
    };

    const deleteBook = async (id: number) => {
        await BookRepository.remove(id);
        await fetchBooks();
    };

    return {
        books,
        loading,
        error,
        refetch: fetchBooks,
        createBook,
        updateBook,
        deleteBook
    };
}
