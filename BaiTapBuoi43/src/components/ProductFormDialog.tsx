import CloseIcon from "@mui/icons-material/Close";
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type { ChangeEvent, FormEvent } from "react";
import type { Category, ProductFormValues } from "../types/product";

type ProductFormDialogProps = {
    open: boolean;
    isEdit: boolean;
    form: ProductFormValues;
    categories: Category[];
    submitLoading: boolean;
    onClose: () => void;
    onInputChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onCategoryChange: (value: Category | null) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ProductFormDialog({
    open,
    isEdit,
    form,
    categories,
    submitLoading,
    onClose,
    onInputChange,
    onCategoryChange,
    onSubmit,
}: ProductFormDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={submitLoading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: 1,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </Typography>

                <IconButton onClick={onClose} disabled={submitLoading}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Box component="form" onSubmit={onSubmit}>
                <DialogContent dividers>
                    <Stack spacing={2}>
                        <TextField
                            label="Tên sản phẩm"
                            name="name"
                            value={form.name}
                            onChange={onInputChange}
                            required
                            fullWidth
                        />

                        <TextField
                            label="SKU"
                            name="sku"
                            value={form.sku}
                            onChange={onInputChange}
                            required
                            fullWidth
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                label="Giá"
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={onInputChange}
                                required
                                fullWidth
                            />

                            <TextField
                                label="Số lượng tồn"
                                name="remaining"
                                type="number"
                                value={form.remaining}
                                onChange={onInputChange}
                                required
                                fullWidth
                            />
                        </Stack>

                        <Autocomplete
                            options={categories}
                            value={form.category}
                            onChange={(_, value) => onCategoryChange(value)}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Danh mục"
                                    required
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        disabled={submitLoading}
                    >
                        Hủy
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitLoading}
                    >
                        {submitLoading
                            ? "Đang xử lý..."
                            : isEdit
                              ? "Lưu thay đổi"
                              : "Thêm mới"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
