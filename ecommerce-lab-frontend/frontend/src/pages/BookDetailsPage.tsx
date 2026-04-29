import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import type { Book } from '../types';
import axiosInstance from '../api/axiosInstance';

export default function BookDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get(`/books/${id}`)
            .then(response => {
                setBook(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching book details", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    if (!book) return <Typography align="center" sx={{ mt: 5 }}>Book not found.</Typography>;

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{book.name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Category: {book.bookCategory}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Author: {book.authorDto?.name} {book.authorDto?.surname}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Available Copies: {book.availableCopies}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}