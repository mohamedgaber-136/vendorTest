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
      return headers;
    },
  }),
  tagTypes: ['VendorServices', "serviceOffers", "serviceProducts", "serviceAds", "servicePosts", "serviceBranches", 'serviceStories'], // Define tag types
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
      // Specify the tag to invalidate after adding an item
      invalidatesTags: ['VendorServices', "serviceOffers", "serviceProducts", "serviceAds", "servicePosts", "serviceBranches", 'serviceStories'], // This tells RTK Query to refetch any queries tagged with 'VendorServices'
    }),
    deleteItem: builder.mutation<AddItemResponse, { endpoint: string; newItem: Partial<ItemType> }>({
      query: ({ endpoint }) => ({
        url: endpoint,
        method: 'DELETE',
      }),
      // Specify the tag to invalidate after adding an item
      invalidatesTags: ['VendorServices', "serviceOffers", "serviceProducts", "serviceAds", "servicePosts", "serviceBranches", 'serviceStories'], // This tells RTK Query to refetch any queries tagged with 'VendorServices'
    }),
    getVendorServices: builder.query<any, string>({
      query: (vendorId) => `service-vendors?vendorId=${vendorId}&embed=city,city.governorate,images&limit=1000`,
      providesTags: ['VendorServices'], // This marks the query with the 'VendorServices' tag
    }),
    getSingleService: builder.query<any, string>({
      query: (serviceId) => `service-vendors/${serviceId}?embed=city,city.governorate,images&limit=1000`,
      providesTags: ['VendorServices'], // This marks the query with the 'VendorServices' tag
    }),
    getServiceOffers: builder.query<any, string>({
      query: (serviceId) => `offers?vendorMainServiceId=${serviceId}&embed=image,galleryImages&limit=1000`,
      providesTags: ['serviceOffers'],
      // This marks the query with the 'VendorServices' tag
    }),
    getServiceProducts: builder.query<any, string>({
      query: (serviceId) => `products?embed=images,city.governorate,service&vendorMainServiceId=${serviceId}&limit=1000`,
      providesTags: ['serviceProducts'],
      // This marks the query with the 'VendorServices' tag
    }),
    getServiceAds: builder.query<any, string>({
      query: (serviceId) => `ads?vendorMainServiceId=${serviceId}&embed=adPackage`,
      providesTags: ['serviceAds'],
      // This marks the query with the 'VendorServices' tag
    }),
    getServicePosts: builder.query<any, string>({
      query: (serviceId) => `posts?vendorMainServiceId=${serviceId}&embed=views,likes,shares,images`,
      providesTags: ['servicePosts'],
      // This marks the query with the 'VendorServices' tag
    }),
    getServiceBranches: builder.query<any, string>({
      query: (serviceId) => `https://testing.gawazy.com/api/v1/web/vendor-branchs?vendorMainServiceId=${serviceId}`,
      providesTags: ['serviceBranches'],
      // This marks the query with the 'VendorServices' tag
    }),
    getServiceStories: builder.query<any, string>({
      query: (serviceId) => `stories?vendorMainServiceId=${serviceId}`,
      providesTags: ['serviceStories'],
      // This marks the query with the 'VendorServices' tag
    }),
    getCities: builder.query<any, string>({
      query: (id) => `cities?governorateId=${id}?limit=1000`,
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

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useGetVendorServicesQuery,
  useGetServiceOffersQuery,
  useGetServiceAdsQuery,
  useGetServiceProductsQuery,
  useGetSingleServiceQuery,
  useGetServicePostsQuery,
  useGetServiceBranchesQuery,
  useGetServiceStoriesQuery,
  useGetCitiesQuery,
  useLoginMutation,
} = api;
