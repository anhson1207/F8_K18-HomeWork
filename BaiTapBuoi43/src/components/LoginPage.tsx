import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type { FormEvent } from "react";

type LoginPageProps = {
    loading: boolean;
    error: string;
    onSubmit: (
        event: FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ) => Promise<void>;
};

export function LoginPage({ loading, error, onSubmit }: LoginPageProps) {
    const [email, setEmail] = useState("nguyenanhson@test.com");
    const [password, setPassword] = useState("12345678");

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background:
                    "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)",
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={8} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
                    <Stack spacing={3}>
                        <div>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Đăng nhập
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Đăng nhập thành công để vào trang quản lý sản phẩm
                            </Typography>
                        </div>

                        

                        {error && <Alert severity="error">{error}</Alert>}

                        <Box
                            component="form"
                            onSubmit={(event) => onSubmit(event, email, password)}
                        >
                            <Stack spacing={2}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    fullWidth
                                    required
                                />

                                <TextField
                                    label="Mật khẩu"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    fullWidth
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? "Đang đăng nhập..." : "Login"}
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}
