export type FieldType = {
    name: string;
    type: "text" | "email" | "password" | "radio" | "file" | "select" | "textarea";
    placeHolder?: string;
    label?: string;
    options?: {
        value: string;
        label: string;
    }[];
};
export type ItemType = {
    commercial_name?: string;
    service_id?: string;
    province?: string;
    city_id?: string;
    mobile?: string;
    whatsapp?: string;
    description?: string;
    images?: File | null;
    cover?: File | null;
    price?: string;
    vendor_type?: string;
    price_type?: string;
    data: any;
};
export type AddItemResponse = {
    success: boolean;
    message?: string;
    item?: ItemType;
};
export interface SubItem {
    title: string;
    url: string;
    icon: React.ElementType;
}
export interface Item {
    title: string;
    url?: string;
    icon: React.ElementType;
    collapse?: boolean;
    subItems?: SubItem[];
}
