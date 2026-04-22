import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import type { Product } from "../types/product";

type ProductTableProps = {
    products: Product[];
    loading: boolean;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
};

const currencyFormatter = new Intl.NumberFormat("vi-VN");

export function ProductTable({
    products,
    loading,
    onEdit,
    onDelete,
}: ProductTableProps) {
    return (
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={70}>STT</TableCell>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Danh mục</TableCell>
                            <TableCell align="right">Giá</TableCell>
                            <TableCell align="right">Tồn kho</TableCell>
                            <TableCell width={180} align="center">
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <CircularProgress size={24} />
                                        <Typography>Đang tải dữ liệu...</Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                                    Không có sản phẩm nào
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product, index) => (
                                <TableRow key={product.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.sku || "-"}</TableCell>
                                    <TableCell>
                                        {product.category?.name || "-"}
                                    </TableCell>
                                    <TableCell align="right">
                                        {currencyFormatter.format(product.price)} đ
                                    </TableCell>
                                    <TableCell align="right">
                                        {product.remaining}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{ justifyContent: "center" }}
                                        >
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                startIcon={<EditIcon />}
                                                onClick={() => onEdit(product)}
                                            >
                                                Sửa
                                            </Button>

                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => onDelete(product)}
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
    );
}
