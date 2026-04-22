export type Category = {
    id: number;
    name: string;
};

export type Product = {
    id: number;
    name: string;
    sku: string;
    price: number;
    remaining: number;
    imageUrl: string;
    category: Category | null;
};

export type ProductPayload = {
    categoryId: number;
    name: string;
    sku: string;
    price: number;
    remaining: number;
};

export type ProductFormValues = {
    id: number | null;
    name: string;
    sku: string;
    price: string;
    remaining: string;
    category: Category | null;
};

export function createEmptyProductForm(): ProductFormValues {
    return {
        id: null,
        name: "",
        sku: "",
        price: "",
        remaining: "",
        category: null,
    };
}
