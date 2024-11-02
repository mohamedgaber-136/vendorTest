// src/Redux/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './Store';
import { AddItemResponse, ItemType } from '../types';

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
      // No need to set Content-Type for FormData, but ensure JSON content-type is set when required
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getItems: builder.query<ItemType, string>({
      query: (itemId) => `${itemId}`,
    }),
    addItem: builder.mutation<AddItemResponse, { endpoint: string; newItem: Partial<ItemType> }>({
      query: ({ endpoint, newItem }) => {
        return {
          url: endpoint,
          method: 'POST',
          body: newItem, // Directly set newItem without stringifying
          // The content type for JSON data will be handled by the fetchBaseQuery
        };
      },
    }),
    getVendorServices: builder.query<any, string>({
      query: (vendorId) => `service-vendors?vendorId=${vendorId}`,
    }),
    getCities: builder.query<any, string>({
     
      query: (id) => `cities?governorateId=${id}`,
    }),
    login: builder.mutation<{ token: string; user: any; status: number; data: any }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useGetVendorServicesQuery,useGetCitiesQuery , useLoginMutation } = api;
