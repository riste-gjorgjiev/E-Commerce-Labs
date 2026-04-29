import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export const Layout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Library E-Shop
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/books">Books</Button>
                    <Button color="inherit" component={Link} to="/authors">Authors</Button>
                    <Button color="inherit" component={Link} to="/countries">Countries</Button>
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