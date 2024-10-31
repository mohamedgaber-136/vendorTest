// src/Redux/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken; // Retrieve token from Redux store
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            // No need to set Content-Type for FormData
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getItems: builder.query({
            query: (itemId) => `${itemId}`,
        }),
        addItem: builder.mutation({
            query: ({ endpoint, newItem }) => {
                const formData = new FormData();
                // Append your fields to the FormData object
                Object.keys(newItem).forEach((key) => {
                    // Ensure that the key is a valid key of ItemType
                    formData.append(key, newItem[key]);
                });
                return {
                    url: endpoint,
                    method: 'POST',
                    body: formData, // Set body as FormData
                };
            },
        }),
        getVendorServices: builder.query({
            query: (vendorId) => `service-vendors?vendorId=${vendorId}`,
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});
export const { useGetItemsQuery, useAddItemMutation, useGetVendorServicesQuery, useLoginMutation } = api;
