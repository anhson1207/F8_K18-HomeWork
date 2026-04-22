import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Stack, Typography } from "@mui/material";
import type {
    ChangeEvent,
    FormEvent,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { LoginPage } from "./components/LoginPage";
import { ProductFormDialog } from "./components/ProductFormDialog";
import { ProductTable } from "./components/ProductTable";
import {
    clearStoredAuthSession,
    createProduct,
    deleteProduct,
    fetchCategories,
    fetchProducts,
    loadStoredAuthSession,
    SessionExpiredError,
    signIn,
    storeAuthSession,
    updateProduct,
} from "./services/storeApi";
import {
    createEmptyProductForm,
    type Category,
    type Product,
    type ProductFormValues,
} from "./types/product";
import type { AuthSession } from "./types/auth";

type Route = "login" | "products";

function getRouteFromHash(): Route {
    return window.location.hash === "#/products" ? "products" : "login";
}

function navigateTo(route: Route) {
    window.location.hash = route === "products" ? "#/products" : "#/login";
}

function App() {
    const [route, setRoute] = useState<Route>(getRouteFromHash);
    const [session, setSession] = useState<AuthSession | null>(
        loadStoredAuthSession
    );
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState<ProductFormValues>(createEmptyProductForm);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const loadedTokenRef = useRef<string | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(getRouteFromHash());
        };

        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const syncSession = useCallback((nextSession: AuthSession | null) => {
        setSession(nextSession);

        if (nextSession) {
            storeAuthSession(nextSession);
            return;
        }

        clearStoredAuthSession();
    }, []);

    const resetProductViewState = useCallback(() => {
        setProducts([]);
        setCategories([]);
        setDialogOpen(false);
        setProductToDelete(null);
        setForm(createEmptyProductForm());
        setIsEdit(false);
        loadedTokenRef.current = null;
    }, []);

    const handleLogout = useCallback((message = "") => {
        syncSession(null);
        resetProductViewState();
        setError(message);
        navigateTo("login");
    }, [resetProductViewState, syncSession]);

    const withSession = async <T,>(
        action: (currentSession: AuthSession) => Promise<{
            data: T;
            session: AuthSession;
        }>
    ) => {
        if (!session) {
            throw new SessionExpiredError("Phiên đăng nhập không còn hợp lệ");
        }

        try {
            const result = await action(session);

            if (
                result.session.accessToken !== session.accessToken ||
                result.session.refreshToken !== session.refreshToken
            ) {
                syncSession(result.session);
            }

            return result.data;
        } catch (caughtError) {
            if (caughtError instanceof SessionExpiredError) {
                handleLogout(caughtError.message);
            }

            throw caughtError;
        }
    };

    useEffect(() => {
        if (session && route === "login") {
            navigateTo("products");
            return;
        }

        if (!session && route === "products") {
            navigateTo("login");
        }
    }, [route, session]);

    useEffect(() => {
        if (!session || route !== "products") {
            return;
        }

        if (loadedTokenRef.current === session.accessToken) {
            return;
        }

        loadedTokenRef.current = session.accessToken;

        const loadProductPage = async () => {
            try {
                setPageLoading(true);
                setError("");

                let nextSession = session;

                const categoriesResponse = await fetchCategories(nextSession);
                nextSession = categoriesResponse.session;

                const productsResponse = await fetchProducts(nextSession);
                nextSession = productsResponse.session;

                if (
                    nextSession.accessToken !== session.accessToken ||
                    nextSession.refreshToken !== session.refreshToken
                ) {
                    syncSession(nextSession);
                }

                loadedTokenRef.current = nextSession.accessToken;

                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
            } catch (caughtError) {
                if (caughtError instanceof SessionExpiredError) {
                    handleLogout(caughtError.message);
                    return;
                }

                setError(
                    caughtError instanceof Error
                        ? caughtError.message
                        : "Không thể tải dữ liệu sản phẩm"
                );
            } finally {
                setPageLoading(false);
            }
        };

        void loadProductPage();
    }, [handleLogout, route, session, syncSession]);

    const handleLogin = async (
        event: FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ) => {
        event.preventDefault();

        try {
            setLoginLoading(true);
            setError("");

            const nextSession = await signIn(email.trim(), password);
            syncSession(nextSession);
            navigateTo("products");
        } catch (caughtError) {
            setError(
                caughtError instanceof Error
                    ? caughtError.message
                    : "Đăng nhập thất bại"
            );
        } finally {
            setLoginLoading(false);
        }
    };

    const handleOpenCreateDialog = () => {
        setIsEdit(false);
        setForm(createEmptyProductForm());
        setDialogOpen(true);
    };

    const handleOpenEditDialog = (product: Product) => {
        setIsEdit(true);
        setForm({
            id: product.id,
            name: product.name,
            sku: product.sku,
            price: String(product.price),
            remaining: String(product.remaining),
            category: product.category,
        });
        setDialogOpen(true);
    };

    const handleCloseFormDialog = () => {
        if (submitLoading) {
            return;
        }

        setDialogOpen(false);
        setForm(createEmptyProductForm());
    };

    const handleFormInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        if (name === "id" || name === "category") {
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value: Category | null) => {
        setForm((prev) => ({
            ...prev,
            category: value,
        }));
    };

    const handleSubmitProduct = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!form.category) {
            setError("Vui lòng chọn danh mục");
            return;
        }

        const price = Number(form.price);
        const remaining = Number(form.remaining);

        if (Number.isNaN(price) || price < 0) {
            setError("Giá sản phẩm phải là số hợp lệ");
            return;
        }

        if (Number.isNaN(remaining) || remaining < 0) {
            setError("Số lượng tồn phải là số hợp lệ");
            return;
        }

        try {
            setSubmitLoading(true);
            setError("");

            const payload = {
                name: form.name.trim(),
                sku: form.sku.trim(),
                price,
                remaining,
                categoryId: form.category.id,
            };

            const nextProduct = await withSession((currentSession) =>
                isEdit && form.id !== null
                    ? updateProduct(currentSession, form.id, payload)
                    : createProduct(currentSession, payload)
            );

            setProducts((prev) =>
                isEdit
                    ? prev.map((product) =>
                          product.id === nextProduct.id ? nextProduct : product
                      )
                    : [nextProduct, ...prev]
            );

            setDialogOpen(false);
            setForm(createEmptyProductForm());
        } catch (caughtError) {
            if (!(caughtError instanceof SessionExpiredError)) {
                setError(
                    caughtError instanceof Error
                        ? caughtError.message
                        : "Không thể lưu sản phẩm"
                );
            }
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleOpenDeleteDialog = (product: Product) => {
        setProductToDelete(product);
    };

    const handleCloseDeleteDialog = () => {
        if (deleteLoading) {
            return;
        }

        setProductToDelete(null);
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) {
            return;
        }

        try {
            setDeleteLoading(true);
            setError("");

            await withSession((currentSession) =>
                deleteProduct(currentSession, productToDelete.id)
            );

            setProducts((prev) =>
                prev.filter((product) => product.id !== productToDelete.id)
            );
            setProductToDelete(null);
        } catch (caughtError) {
            if (!(caughtError instanceof SessionExpiredError)) {
                setError(
                    caughtError instanceof Error
                        ? caughtError.message
                        : "Không thể xóa sản phẩm"
                );
            }
        } finally {
            setDeleteLoading(false);
        }
    };

    if (!session) {
        return (
            <LoginPage
                loading={loginLoading}
                error={error}
                onSubmit={handleLogin}
            />
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={3}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "center" },
                    }}
                >
                    <div>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Quản lý sản phẩm
                        </Typography>
                        <Typography color="text.secondary">
                            Danh sách sản phẩm sau khi đăng nhập thành công
                        </Typography>
                    </div>

                    <Stack direction="row" spacing={1.5}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenCreateDialog}
                            disabled={pageLoading || categories.length === 0}
                        >
                            Thêm sản phẩm
                        </Button>

                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<LogoutIcon />}
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Stack>

                {error && <Alert severity="error">{error}</Alert>}

                <ProductTable
                    products={products}
                    loading={pageLoading}
                    onEdit={handleOpenEditDialog}
                    onDelete={handleOpenDeleteDialog}
                />
            </Stack>

            <ProductFormDialog
                open={dialogOpen}
                isEdit={isEdit}
                form={form}
                categories={categories}
                submitLoading={submitLoading}
                onClose={handleCloseFormDialog}
                onInputChange={handleFormInputChange}
                onCategoryChange={handleCategoryChange}
                onSubmit={handleSubmitProduct}
            />

            <ConfirmDialog
                open={Boolean(productToDelete)}
                title="Xác nhận xóa sản phẩm"
                description={
                    productToDelete
                        ? `Bạn có chắc muốn xóa sản phẩm "${productToDelete.name}" không?`
                        : ""
                }
                confirmText="Xóa sản phẩm"
                loading={deleteLoading}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteProduct}
            />
        </Container>
    );
}

export default App;
