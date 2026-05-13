import React, { useMemo, useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useAuthors } from '../hooks/useAuthors';
import { useAuth } from '../hooks/useAuth';
import { useViewPreference } from '../hooks/useViewPreference';
import { EntityDialog } from '../components/EntityDialog';
import { isAdminRole } from '../utils/roles';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Stack,
    Button,
    TextField,
    MenuItem,
    Chip,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import type { BookPayload } from '../types';

const BooksPage: React.FC = () => {
    const { books, loading, error, createBook, updateBook, deleteBook } = useBooks();
    const { authors } = useAuthors();
    const { role, username } = useAuth();
    const isAdmin = isAdminRole(role);
    const { viewMode, setViewMode, loading: viewModeLoading } = useViewPreference(username, 'books');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formState, setFormState] = useState<BookPayload>({
        name: '',
        bookCategory: 'NOVEL',
        authorId: 0,
        bookState: 'GOOD',
        copies: 1
    });

    const categoryOptions = useMemo(() => (
        ['NOVEL', 'THRILLER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'DRAMA']
    ), []);
    const stateOptions = useMemo(() => (['GOOD', 'BAD']), []);

    const openCreateDialog = () => {
        if (!authors.length) {
            return;
        }
        setEditingId(null);
        setFormState({
            name: '',
            bookCategory: 'NOVEL',
            authorId: authors[0]?.id ?? 0,
            bookState: 'GOOD',
            copies: 1
        });
        setDialogOpen(true);
    };

    const openEditDialog = (bookId: number) => {
        const book = books.find((item) => item.id === bookId);
        if (!book) return;
        setEditingId(bookId);
        setFormState({
            name: book.name,
            bookCategory: book.bookCategory,
            authorId: book.authorDto?.id ?? 0,
            bookState: book.state,
            copies: book.availableCopies
        });
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (editingId !== null) {
            await updateBook(editingId, formState);
        } else {
            await createBook(formState);
        }
        setDialogOpen(false);
    };

    const handleDelete = async (bookId: number) => {
        await deleteBook(bookId);
    };

    if (loading || viewModeLoading) return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></Box>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} sx={{ mb: 3 }} spacing={2}>
                <Typography variant="h4">Books</Typography>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'space-between', sm: 'flex-end' }}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={(_, value) => value && setViewMode(value)}
                        size="small"
                        color="primary"
                    >
                        <ToggleButton value="grid">Grid</ToggleButton>
                        <ToggleButton value="column">Column</ToggleButton>
                    </ToggleButtonGroup>
                    {isAdmin && (
                        <Button variant="contained" onClick={openCreateDialog} disabled={!authors.length}>Add Book</Button>
                    )}
                </Stack>
            </Stack>
            {viewMode === 'grid' ? (
                <Grid container spacing={3}>
                    {books.map((book) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                        <Typography variant="h6">{book.name}</Typography>
                                        <Chip size="small" label={book.state} color={book.state === 'GOOD' ? 'success' : 'default'} />
                                    </Stack>
                                    <Typography color="textSecondary">Category: {book.bookCategory}</Typography>
                                    <Typography variant="body2">
                                        Author: {book.authorDto?.name} {book.authorDto?.surname}
                                    </Typography>
                                    <Typography variant="body2">Available Copies: {book.availableCopies}</Typography>
                                    {isAdmin && (
                                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                            <Button size="small" variant="outlined" onClick={() => openEditDialog(book.id)}>Edit</Button>
                                            <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(book.id)}>Delete</Button>
                                        </Stack>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Stack spacing={2}>
                    {books.map((book) => (
                        <Card key={book.id} variant="outlined">
                            <CardContent>
                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                                    <Box>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                            <Typography variant="h6">{book.name}</Typography>
                                            <Chip size="small" label={book.state} color={book.state === 'GOOD' ? 'success' : 'default'} />
                                        </Stack>
                                        <Typography color="textSecondary">Category: {book.bookCategory}</Typography>
                                        <Typography variant="body2">
                                            Author: {book.authorDto?.name} {book.authorDto?.surname}
                                        </Typography>
                                        <Typography variant="body2">Available Copies: {book.availableCopies}</Typography>
                                    </Box>
                                    {isAdmin && (
                                        <Stack direction="row" spacing={1}>
                                            <Button size="small" variant="outlined" onClick={() => openEditDialog(book.id)}>Edit</Button>
                                            <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(book.id)}>Delete</Button>
                                        </Stack>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
            <EntityDialog
                open={dialogOpen}
                title={editingId !== null ? 'Edit Book' : 'Add Book'}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                submitLabel={editingId !== null ? 'Save Changes' : 'Create Book'}
            >
                <TextField
                    label="Name"
                    value={formState.name}
                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                    fullWidth
                />
                <TextField
                    select
                    label="Category"
                    value={formState.bookCategory}
                    onChange={(event) => setFormState({ ...formState, bookCategory: event.target.value })}
                    fullWidth
                >
                    {categoryOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Author"
                    value={formState.authorId}
                    onChange={(event) => setFormState({ ...formState, authorId: Number(event.target.value) })}
                    fullWidth
                >
                    {authors.map((author) => (
                        <MenuItem key={author.id} value={author.id}>{author.name} {author.surname}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="State"
                    value={formState.bookState}
                    onChange={(event) => setFormState({ ...formState, bookState: event.target.value })}
                    fullWidth
                >
                    {stateOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    type="number"
                    label="Copies"
                    value={formState.copies}
                    onChange={(event) => setFormState({ ...formState, copies: Number(event.target.value) })}
                    inputProps={{ min: 0 }}
                    fullWidth
                />
            </EntityDialog>
        </div>)
};

export default BooksPage;
