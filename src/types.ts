// src/types.ts

export type FieldType = {
    name: string;
    type: "text" | "email" | "password" | "radio" | "file" | "select"|"textarea" |"hidden"; 
    placeHolder?: string;
    label?: string;
    options?: { value: string; label: string }[]; // For dropdown select options
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
    data:any
  };

export type AddItemResponse = {
    success: boolean; // Indicates whether the addition was successful
    message?: string; // Optional message from the server
    item?: ItemType; // The added item details, if applicable
};

export interface SubItem {
    title: string;
    url?: string; // Optional URL for nested sub-items
    collapse?: boolean; // Optional collapse property for nested items
    subItems?: SubItem[]; // Recursive sub-items for deeper nesting if needed
  }

export interface Item {
    title: string;
    url?: string; // Make this optional for parent items without links
    collapse?: boolean; // Optional collapse property
    subItems?: SubItem[]; // Optional sub-items
}
// Define the type for the menu item

  