import type { AuthSession } from "../types/auth";
import type {
    Category,
    Product,
    ProductPayload,
} from "../types/product";

const API_BASE = "https://k305jhbh09.execute-api.ap-southeast-1.amazonaws.com";
const AUTH_STORAGE_KEY = "store-auth";

const ENDPOINTS = {
    login: `${API_BASE}/auth/signin`,
    refresh: `${API_BASE}/auth/refresh-token`,
    products: `${API_BASE}/products`,
    product: (id: number) => `${API_BASE}/products/${id}`,
    categories: `${API_BASE}/categories`,
};

type ApiResult<T> = {
    data: T;
    session: AuthSession;
};

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string {
    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number") {
        return String(value);
    }

    return "";
}

function getNumber(value: unknown): number {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsedNumber = Number(value);

        if (Number.isFinite(parsedNumber)) {
            return parsedNumber;
        }
    }

    return 0;
}

function normalizeCategory(payload: unknown): Category | null {
    if (!isRecord(payload)) {
        return null;
    }

    return {
        id: getNumber(payload.id),
        name: getString(payload.name),
    };
}

function normalizeProduct(payload: unknown): Product | null {
    if (!isRecord(payload)) {
        return null;
    }

    return {
        id: getNumber(payload.id),
        name: getString(payload.name),
        sku: getString(payload.sku),
        price: getNumber(payload.price),
        remaining: getNumber(payload.remaining),
        imageUrl: getString(payload.imageUrl),
        category: normalizeCategory(payload.category),
    };
}

function extractErrorMessage(payload: unknown, fallback: string): string {
    if (typeof payload === "string" && payload.trim()) {
        return payload;
    }

    if (isRecord(payload) && typeof payload.message === "string") {
        return payload.message;
    }

    return fallback;
}

function isTokenExpiredResponse(payload: unknown): boolean {
    if (!isRecord(payload) || typeof payload.message !== "string") {
        return false;
    }

    return payload.message.toLowerCase().includes("token expired");
}

function ensureAuthSession(payload: unknown): AuthSession {
    if (
        isRecord(payload) &&
        typeof payload.accessToken === "string" &&
        typeof payload.refreshToken === "string"
    ) {
        return {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
        };
    }

    throw new Error("Server không trả về token hợp lệ");
}

async function parseResponseBody(response: Response): Promise<unknown> {
    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text) as unknown;
    } catch {
        return text;
    }
}

async function refreshAuthSession(refreshToken: string): Promise<AuthSession> {
    const response = await fetch(ENDPOINTS.refresh, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
        throw new SessionExpiredError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    }

    return ensureAuthSession(responseBody);
}

async function requestWithAuth(
    session: AuthSession,
    url: string,
    options: RequestInit = {},
    fallbackMessage: string,
    allowRefresh = true
): Promise<ApiResult<unknown>> {
    const headers = new Headers(options.headers);
    headers.set("Authorization", `Bearer ${session.accessToken}`);

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
        if (allowRefresh && isTokenExpiredResponse(responseBody)) {
            const refreshedSession = await refreshAuthSession(
                session.refreshToken
            );

            return requestWithAuth(
                refreshedSession,
                url,
                options,
                fallbackMessage,
                false
            );
        }

        throw new Error(extractErrorMessage(responseBody, fallbackMessage));
    }

    return {
        data: responseBody,
        session,
    };
}

export class SessionExpiredError extends Error {}

export function loadStoredAuthSession(): AuthSession | null {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
        return null;
    }

    try {
        return ensureAuthSession(JSON.parse(rawValue) as unknown);
    } catch {
        clearStoredAuthSession();
        return null;
    }
}

export function storeAuthSession(session: AuthSession) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredAuthSession() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function signIn(
    email: string,
    password: string
): Promise<AuthSession> {
    const response = await fetch(ENDPOINTS.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
        throw new Error(extractErrorMessage(responseBody, "Đăng nhập thất bại"));
    }

    return ensureAuthSession(responseBody);
}

export async function fetchProducts(
    session: AuthSession
): Promise<ApiResult<Product[]>> {
    const response = await requestWithAuth(
        session,
        ENDPOINTS.products,
        { method: "GET" },
        "Không thể tải danh sách sản phẩm"
    );

    const products = Array.isArray(response.data)
        ? response.data
              .map((item) => normalizeProduct(item))
              .filter((item): item is Product => item !== null)
        : [];

    return {
        data: products,
        session: response.session,
    };
}

export async function fetchCategories(
    session: AuthSession
): Promise<ApiResult<Category[]>> {
    const response = await requestWithAuth(
        session,
        ENDPOINTS.categories,
        { method: "GET" },
        "Không thể tải danh sách danh mục"
    );

    const categories = Array.isArray(response.data)
        ? response.data
              .map((item) => normalizeCategory(item))
              .filter((item): item is Category => item !== null)
        : [];

    return {
        data: categories,
        session: response.session,
    };
}

export async function createProduct(
    session: AuthSession,
    payload: ProductPayload
): Promise<ApiResult<Product>> {
    const response = await requestWithAuth(
        session,
        ENDPOINTS.products,
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
        "Không thể tạo sản phẩm"
    );

    const product = normalizeProduct(response.data);

    if (!product) {
        throw new Error("Server không trả về dữ liệu sản phẩm hợp lệ");
    }

    return {
        data: product,
        session: response.session,
    };
}

export async function updateProduct(
    session: AuthSession,
    id: number,
    payload: ProductPayload
): Promise<ApiResult<Product>> {
    const response = await requestWithAuth(
        session,
        ENDPOINTS.product(id),
        {
            method: "PUT",
            body: JSON.stringify(payload),
        },
        "Không thể cập nhật sản phẩm"
    );

    const product = normalizeProduct(response.data);

    if (!product) {
        throw new Error("Server không trả về dữ liệu sản phẩm hợp lệ");
    }

    return {
        data: product,
        session: response.session,
    };
}

export async function deleteProduct(
    session: AuthSession,
    id: number
): Promise<ApiResult<null>> {
    const response = await requestWithAuth(
        session,
        ENDPOINTS.product(id),
        {
            method: "DELETE",
        },
        "Không thể xóa sản phẩm"
    );

    return {
        data: null,
        session: response.session,
    };
}
