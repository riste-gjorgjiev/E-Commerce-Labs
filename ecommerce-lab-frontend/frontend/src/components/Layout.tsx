import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, Stack } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { formatRoleLabel } from '../utils/roles';

export const Layout: React.FC = () => {
    const { isAuthenticated, role, username, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Library E-Shop
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        {isAuthenticated && (
                            <>
                                <Button color="inherit" component={Link} to="/books">Books</Button>
                                <Button color="inherit" component={Link} to="/authors">Authors</Button>
                                <Button color="inherit" component={Link} to="/countries">Countries</Button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/register">Register</Button>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <Typography variant="body2" sx={{ ml: 1 }}>{username} ({formatRoleLabel(role)})</Typography>
                                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                {/* The child routes will render here */}
                <Outlet />
            </Container>

            <Box component="footer" sx={{ py: 3, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    © 2026 E-Commerce Laboratory
                </Typography>
            </Box>
        </Box>
    );
};
