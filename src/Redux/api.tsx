// src/Redux/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store'; // Adjust this import based on your store's location
import { ItemType, AddItemResponse } from './types';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken; // Retrieve token from Redux store
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<ItemType, string>({
      query: (itemId) => `${itemId}`,
    }),
    addItem: builder.mutation<AddItemResponse, { endpoint: string; newItem: Partial<ItemType> }>({
      query: ({ endpoint, newItem }) => ({
        url: endpoint,
        method: 'POST',
        body: newItem,
      }),
    }),
    getVendorServices: builder.query<any, string>({
      query: (vendorId) => `service-vendors?vendorId=${vendorId}`,
    }),
    login: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useGetVendorServicesQuery, useLoginMutation } = api;
