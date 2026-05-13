import React, { useState } from 'react';
import { useAuthors } from '../hooks/useAuthors';
import { useCountries } from '../hooks/useCountries';
import { useAuth } from '../hooks/useAuth';
import { EntityDialog } from '../components/EntityDialog';
import {
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    CircularProgress,
    Box,
    Stack,
    Button,
    TextField,
    MenuItem,
    Box as MuiBox
} from '@mui/material';
import type { AuthorPayload } from '../types';

const AuthorsPage: React.FC = () => {
    const { authors, loading, error, createAuthor, updateAuthor, deleteAuthor } = useAuthors();
    const { countries } = useCountries();
    const { role } = useAuth();
    const isAdmin = role === 'ROLE_ADMIN';
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formState, setFormState] = useState<AuthorPayload>({
        name: '',
        surname: '',
        countryId: 0
    });

    const openCreateDialog = () => {
        if (!countries.length) {
            return;
        }
        setEditingId(null);
        setFormState({
            name: '',
            surname: '',
            countryId: countries[0]?.id ?? 0
        });
        setDialogOpen(true);
    };

    const openEditDialog = (authorId: number) => {
        const author = authors.find((item) => item.id === authorId);
        if (!author) return;
        setEditingId(authorId);
        setFormState({
            name: author.name,
            surname: author.surname,
            countryId: author.country?.id ?? 0
        });
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (editingId !== null) {
            await updateAuthor(editingId, formState);
        } else {
            await createAuthor(formState);
        }
        setDialogOpen(false);
    };

    const handleDelete = async (authorId: number) => {
        await deleteAuthor(authorId);
    };

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></Box>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4">Authors</Typography>
                {isAdmin && (
                    <Button variant="contained" onClick={openCreateDialog} disabled={!countries.length}>Add Author</Button>
                )}
            </Stack>
            <Paper elevation={2}>
                <List>
                    {authors.map((author) => (
                        <ListItem key={author.id} divider>
                            <ListItemText
                                primary={`${author.name} ${author.surname}`}
                                secondary={`Country: ${author.country.name}`}
                            />
                            {isAdmin && (
                                <MuiBox sx={{ ml: 'auto' }}>
                                    <Stack direction="row" spacing={1}>
                                        <Button size="small" variant="outlined" onClick={() => openEditDialog(author.id)}>Edit</Button>
                                        <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(author.id)}>Delete</Button>
                                    </Stack>
                                </MuiBox>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <EntityDialog
                open={dialogOpen}
                title={editingId !== null ? 'Edit Author' : 'Add Author'}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                submitLabel={editingId !== null ? 'Save Changes' : 'Create Author'}
            >
                <TextField
                    label="Name"
                    value={formState.name}
                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                    fullWidth
                />
                <TextField
                    label="Surname"
                    value={formState.surname}
                    onChange={(event) => setFormState({ ...formState, surname: event.target.value })}
                    fullWidth
                />
                <TextField
                    select
                    label="Country"
                    value={formState.countryId}
                    onChange={(event) => setFormState({ ...formState, countryId: Number(event.target.value) })}
                    fullWidth
                >
                    {countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                    ))}
                </TextField>
            </EntityDialog>
        </div>
    );
};

export default AuthorsPage;
