import React from 'react';
import {useBooks} from '../hooks/useBooks';
import {Grid, Card, CardContent, Typography, CircularProgress, Box} from '@mui/material';

const BooksPage: React.FC = () => {
    const {books, loading} = useBooks();

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></Box>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>Books</Typography>
            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={book.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">{book.name}</Typography>
                                <Typography color="textSecondary">Category: {book.bookCategory}</Typography>

                                <Typography variant="body2">
                                    Author: {book.authorDto?.name} {book.authorDto?.surname}
                                </Typography>
                                <Typography variant="body2">Available Copies: {book.availableCopies}</Typography>
                                <Typography variant="body2">State: {book.state}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>)
};

export default BooksPage;