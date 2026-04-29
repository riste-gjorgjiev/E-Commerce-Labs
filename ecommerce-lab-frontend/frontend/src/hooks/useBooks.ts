import { useState, useEffect} from 'react';
import { BookRepository } from '../repository/BookRepository.ts';
import type {Book} from '../types';

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await BookRepository.getAll();
                setBooks(data);
            } catch (error) {
                console.error("Failed to fetch books.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);
    return { books, loading };
}