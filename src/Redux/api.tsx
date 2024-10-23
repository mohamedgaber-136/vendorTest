// src/Redux/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a type for the items you will be fetching
export type ItemType = {
  id: string;
  name: string;
  // Add more fields as necessary
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Replace with your actual base URL
  endpoints: (builder) => ({
    getItems: builder.query<ItemType[], void>({
      query: () => 'items', // Adjust based on your API endpoint
    }),
    // Add more endpoints here as needed
  }),
});

// Export hooks for usage in functional components
export const { useGetItemsQuery } = api;
