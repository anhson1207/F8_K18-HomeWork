import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const API_BASE = "https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com";
const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxMyIsImV4cCI6MTc3NjQzNDIxNywidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3NjQzMzYxNywiZW1haWwiOiJuZ3V5ZW5hbmhzb25AdGVzdC5jb20ifQ.tNnKD-rVHXJfvuTNUg7MKXHmyvtsi2wlpa8vSx29yR0";

const ENDPOINTS = {
    list: `${API_BASE}/customers`,
    create: `${API_BASE}/customers`,
    update: (id) => `${API_BASE}/customers/${id}`,
    remove: (id) => `${API_BASE}/customers/${id}`,
};

const emptyForm = {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
};

function normalizeCustomer(item) {
    return {
        id: item.id ?? "",
        name: item.name ?? "",
        email: item.email ?? "",
        phone: item.phone ?? "",
        address: item.address ?? "",
    };
}

async function fetchCustomersData(setLoading, setError, setCustomers) {
    try {
        setLoading(true);
        setError("");

        const response = await fetch(ENDPOINTS.list, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Không thể tải danh sách khách hàng");
        }

        const data = await response.json();

        const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.content)
            ? data.content
            : [];

        setCustomers(list.map(normalizeCustomer));
    } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
    } finally {
        setLoading(false);
    }
}

function openCreateDialog(setIsEdit, setForm, setDialogOpen) {
    setIsEdit(false);
    setForm(emptyForm);
    setDialogOpen(true);
}

function openEditDialog(customer, setIsEdit, setForm, setDialogOpen) {
    setIsEdit(true);
    setForm({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
    });
    setDialogOpen(true);
}

function closeDialog(setDialogOpen, setForm) {
    setDialogOpen(false);
    setForm(emptyForm);
}

function handleInputChange(e, setForm) {
    const { name, value } = e.target;
    setForm((prev) => ({
        ...prev,
        [name]: value,
    }));
}

async function submitCustomer(
    e,
    isEdit,
    form,
    setSubmitLoading,
    setError,
    setDialogOpen,
    setForm,
    setLoading,
    setCustomers
) {
    e.preventDefault();

    try {
        setSubmitLoading(true);
        setError("");

        const payload = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
        };

        const response = await fetch(
            isEdit ? ENDPOINTS.update(form.id) : ENDPOINTS.create,
            {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Lưu khách hàng thất bại");
        }

        closeDialog(setDialogOpen, setForm);
        await fetchCustomersData(setLoading, setError, setCustomers);
    } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi lưu dữ liệu");
    } finally {
        setSubmitLoading(false);
    }
}

async function deleteCustomerData(
    customer,
    setLoading,
    setError,
    setCustomers
) {
    const confirmDelete = window.confirm(
        `Bạn có chắc muốn xóa khách hàng "${customer.name}" không?`
    );

    if (!confirmDelete) return;

    try {
        setLoading(true);
        setError("");

        const response = await fetch(ENDPOINTS.remove(customer.id), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || "Xóa khách hàng thất bại");
        }

        await fetchCustomersData(setLoading, setError, setCustomers);
    } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi xóa dữ liệu");
        setLoading(false);
    }
}

function App() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        fetchCustomersData(setLoading, setError, setCustomers);
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                >
                    <Typography variant="h4" fontWeight={700}>
                        Quản lý khách hàng
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() =>
                            openCreateDialog(setIsEdit, setForm, setDialogOpen)
                        }
                    >
                        Thêm khách hàng
                    </Button>
                </Box>

                {error && <Alert severity="error">{error}</Alert>}

                <Paper
                    elevation={3}
                    sx={{ borderRadius: 3, overflow: "hidden" }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={80}>STT</TableCell>
                                    <TableCell>Họ tên</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>SĐT</TableCell>
                                    <TableCell>Địa chỉ</TableCell>
                                    <TableCell width={180} align="center">
                                        Thao tác
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            align="center"
                                            sx={{ py: 5 }}
                                        >
                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <CircularProgress size={24} />
                                                <Typography>
                                                    Đang tải dữ liệu...
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ) : customers.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            align="center"
                                            sx={{ py: 5 }}
                                        >
                                            Không có khách hàng nào
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    customers.map((customer, index) => (
                                        <TableRow
                                            key={customer.id || index}
                                            hover
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                {customer.name}
                                            </TableCell>
                                            <TableCell>
                                                {customer.email || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {customer.phone || "-"}
                                            </TableCell>
                                            <TableCell>
                                                {customer.address || "-"}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    justifyContent="center"
                                                >
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<EditIcon />}
                                                        onClick={() =>
                                                            openEditDialog(
                                                                customer,
                                                                setIsEdit,
                                                                setForm,
                                                                setDialogOpen
                                                            )
                                                        }
                                                    >
                                                        Sửa
                                                    </Button>

                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="error"
                                                        startIcon={
                                                            <DeleteIcon />
                                                        }
                                                        onClick={() =>
                                                            deleteCustomerData(
                                                                customer,
                                                                setLoading,
                                                                setError,
                                                                setCustomers
                                                            )
                                                        }
                                                    >
                                                        Xóa
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Stack>

            <Dialog
                open={dialogOpen}
                onClose={() => closeDialog(setDialogOpen, setForm)}
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
                    <Typography variant="h6" fontWeight={700}>
                        {isEdit ? "Cập nhật khách hàng" : "Thêm khách hàng"}
                    </Typography>

                    <IconButton
                        onClick={() => closeDialog(setDialogOpen, setForm)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Box
                    component="form"
                    onSubmit={(e) =>
                        submitCustomer(
                            e,
                            isEdit,
                            form,
                            setSubmitLoading,
                            setError,
                            setDialogOpen,
                            setForm,
                            setLoading,
                            setCustomers
                        )
                    }
                >
                    <DialogContent dividers>
                        <Stack spacing={2}>
                            <TextField
                                label="Họ tên"
                                name="name"
                                value={form.name}
                                onChange={(e) => handleInputChange(e, setForm)}
                                required
                                fullWidth
                            />

                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={(e) => handleInputChange(e, setForm)}
                                fullWidth
                            />

                            <TextField
                                label="Số điện thoại"
                                name="phone"
                                value={form.phone}
                                onChange={(e) => handleInputChange(e, setForm)}
                                fullWidth
                            />

                            <TextField
                                label="Địa chỉ"
                                name="address"
                                value={form.address}
                                onChange={(e) => handleInputChange(e, setForm)}
                                multiline
                                rows={3}
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => closeDialog(setDialogOpen, setForm)}
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
        </Container>
    );
}

export default App;
