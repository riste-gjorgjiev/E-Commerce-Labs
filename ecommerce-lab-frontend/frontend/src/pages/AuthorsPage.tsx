import React from 'react';
import { useAuthors } from '../hooks/useAuthors';
import { List, ListItem, ListItemText, Paper, Typography, CircularProgress, Box } from '@mui/material';

const AuthorsPage: React.FC = () => {
    const { authors, loading } = useAuthors();

    if (loading) return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></Box>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>Authors</Typography>
            <Paper elevation={2}>
                <List>
                    {authors.map((author) => (
                        <ListItem key={author.id} divider>
                            <ListItemText
                                primary={`${author.name} ${author.surname}`}
                                secondary={`Country: ${author.country.name}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default AuthorsPage;