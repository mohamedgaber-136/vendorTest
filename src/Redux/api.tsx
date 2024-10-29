// src/Redux/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ItemType, AddItemResponse } from './types'; // Adjust imports based on your setup

const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getItems: builder.query<ItemType, string>({
      query: (itemId) => `items/${itemId}`,
    }),
    addItem: builder.mutation<AddItemResponse, { endpoint: string; newItem: Partial<ItemType> }>({
      query: ({ endpoint, newItem }) => ({
        url: endpoint,
        method: 'POST',
        body: newItem,
      }),
    }),
    login: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login', // Adjust this if your endpoint differs
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useLoginMutation } = api;
