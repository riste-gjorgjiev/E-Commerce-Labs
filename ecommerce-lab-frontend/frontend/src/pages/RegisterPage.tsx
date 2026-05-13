import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await register({
                username: formState.username,
                password: formState.password
            });
            navigate('/books');
        } catch (submitError) {
            console.error(submitError);
            setError('Registration failed. Please try a different username.');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ p: 4, width: '100%', maxWidth: 420 }}>
                <Typography variant="h5" gutterBottom>Register</Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Username"
                        value={formState.username}
                        onChange={(event) => setFormState({ ...formState, username: event.target.value })}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={formState.password}
                        onChange={(event) => setFormState({ ...formState, password: event.target.value })}
                        required
                        fullWidth
                    />
                    <Button variant="contained" type="submit">Create Account</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
