import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    buttonText?: string;
}

export default function SuccessModal({ 
    open, 
    onClose, 
    title = 'Sucesso!',
    message = 'Operação realizada com sucesso!',
    buttonText = 'Fechar'
}: SuccessModalProps) {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 1
                }
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', pt: 4, pb: 2 }}>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        mb: 2
                    }}
                >
                    <Typography variant="h3" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                        ✓
                    </Typography>
                </Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: 'grey.800' }}>
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
                <Typography variant="body1" sx={{ color: 'grey.700' }}>
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="success"
                    sx={{ 
                        minWidth: 140,
                        textTransform: 'none',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
