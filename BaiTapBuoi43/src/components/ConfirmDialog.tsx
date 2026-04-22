import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    confirmText: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export function ConfirmDialog({
    open,
    title,
    description,
    confirmText,
    loading = false,
    onClose,
    onConfirm,
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>
                <Typography>{description}</Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="outlined" onClick={onClose} disabled={loading}>
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? "Đang xóa..." : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
