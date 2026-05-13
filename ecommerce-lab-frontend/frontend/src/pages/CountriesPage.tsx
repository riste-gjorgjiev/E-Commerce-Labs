import React, { useState } from 'react';
import { useCountries } from '../hooks/useCountries';
import { useAuth } from '../hooks/useAuth';
import { EntityDialog } from '../components/EntityDialog';
import { isAdminRole } from '../utils/roles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
    Stack,
    Button,
    TextField
} from '@mui/material';
import type { CountryPayload } from '../types';

const CountriesPage: React.FC = () => {
    const { countries, loading, error, createCountry, updateCountry, deleteCountry } = useCountries();
    const { role } = useAuth();
    const isAdmin = isAdminRole(role);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formState, setFormState] = useState<CountryPayload>({
        name: '',
        continent: ''
    });

    const openCreateDialog = () => {
        setEditingId(null);
        setFormState({ name: '', continent: '' });
        setDialogOpen(true);
    };

    const openEditDialog = (countryId: number) => {
        const country = countries.find((item) => item.id === countryId);
        if (!country) return;
        setEditingId(countryId);
        setFormState({ name: country.name, continent: country.continent });
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (editingId !== null) {
            await updateCountry(editingId, formState);
        } else {
            await createCountry(formState);
        }
        setDialogOpen(false);
    };

    const handleDelete = async (countryId: number) => {
        await deleteCountry(countryId);
    };

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></Box>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4">Countries</Typography>
                {isAdmin && (
                    <Button variant="contained" onClick={openCreateDialog}>Add Country</Button>
                )}
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Continent</strong></TableCell>
                            {isAdmin && <TableCell />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.map((country) => (
                            <TableRow key={country.id}>
                                <TableCell>{country.id}</TableCell>
                                <TableCell>{country.name}</TableCell>
                                <TableCell>{country.continent}</TableCell>
                                {isAdmin && (
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Button size="small" variant="outlined" onClick={() => openEditDialog(country.id)}>Edit</Button>
                                            <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(country.id)}>Delete</Button>
                                        </Stack>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EntityDialog
                open={dialogOpen}
                title={editingId !== null ? 'Edit Country' : 'Add Country'}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                submitLabel={editingId !== null ? 'Save Changes' : 'Create Country'}
            >
                <TextField
                    label="Name"
                    value={formState.name}
                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                    fullWidth
                />
                <TextField
                    label="Continent"
                    value={formState.continent}
                    onChange={(event) => setFormState({ ...formState, continent: event.target.value })}
                    fullWidth
                />
            </EntityDialog>
        </div>
    );
};

export default CountriesPage;
