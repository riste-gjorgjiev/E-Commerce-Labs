import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';

type EntityDialogProps = {
    open: boolean;
    title: string;
    onClose: () => void;
    onSubmit: () => void;
    submitLabel?: string;
    children: React.ReactNode;
};

export const EntityDialog: React.FC<EntityDialogProps> = ({
    open,
    title,
    onClose,
    onSubmit,
    submitLabel = 'Save',
    children
}) => {
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) {
            setSubmitting(false);
        }
    }, [open]);

    const handleSubmit = async () => {
        setSubmitting(true);
        await onSubmit();
        setSubmitting(false);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {children}
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
                    {submitLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
