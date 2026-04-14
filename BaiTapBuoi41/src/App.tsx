import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com";
const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxMyIsImV4cCI6MTc3NjE2NDM5OSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc3NjE2Mzc5OSwiZW1haWwiOiJuZ3V5ZW5hbmhzb25AdGVzdC5jb20ifQ.MxD_uRGBMfsze6NJdbHjRRbnjbd67akZl8BUwZH-ans";

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
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address,
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
        <div className="page">
            <div className="container">
                <div className="header">
                    <div>
                        <h1>Quản lý khách hàng</h1>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            openCreateDialog(setIsEdit, setForm, setDialogOpen)
                        }
                    >
                        + Thêm khách hàng
                    </button>
                </div>

                <div className="card">
                    {error && <div className="error-box">{error}</div>}

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>SĐT</th>
                                    <th>Địa chỉ</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="empty-cell">
                                            Đang tải dữ liệu...
                                        </td>
                                    </tr>
                                ) : customers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="empty-cell">
                                            Không có khách hàng nào
                                        </td>
                                    </tr>
                                ) : (
                                    customers.map((customer, index) => (
                                        <tr key={customer.id || index}>
                                            <td>{index + 1}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email || "-"}</td>
                                            <td>{customer.phone || "-"}</td>
                                            <td>{customer.address || "-"}</td>
                                            <td>
                                                <div className="action-group">
                                                    <button
                                                        className="btn btn-sm btn-edit"
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
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-delete"
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
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {dialogOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>
                                {isEdit
                                    ? "Cập nhật khách hàng"
                                    : "Thêm khách hàng"}
                            </h2>
                            <button
                                className="close-btn"
                                onClick={() =>
                                    closeDialog(setDialogOpen, setForm)
                                }
                            >
                                ×
                            </button>
                        </div>

                        <form
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
                            className="form"
                        >
                            <div className="form-group full-width">
                                <label>Họ tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) =>
                                        handleInputChange(e, setForm)
                                    }
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        handleInputChange(e, setForm)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={(e) =>
                                        handleInputChange(e, setForm)
                                    }
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Địa chỉ</label>
                                <textarea
                                    name="address"
                                    value={form.address}
                                    onChange={(e) =>
                                        handleInputChange(e, setForm)
                                    }
                                    rows={3}
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() =>
                                        closeDialog(setDialogOpen, setForm)
                                    }
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitLoading}
                                >
                                    {submitLoading
                                        ? "Đang xử lý..."
                                        : isEdit
                                        ? "Lưu thay đổi"
                                        : "Thêm mới"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
