import React from 'react';
import { useCountries } from '../hooks/useCountries';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box } from '@mui/material';

const CountriesPage: React.FC = () => {
    const { countries, loading } = useCountries();

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></Box>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>Countries</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Continent</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.map((country) => (
                            <TableRow key={country.id}>
                                <TableCell>{country.id}</TableCell>
                                <TableCell>{country.name}</TableCell>
                                <TableCell>{country.continent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CountriesPage;