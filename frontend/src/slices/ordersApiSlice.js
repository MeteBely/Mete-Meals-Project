import { ORDERS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Order'],
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: '/api/config/stripe',
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['Order'],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),
    getPaymentResults: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/events`,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      providesTags: ['Order'],
    }),
    deliveredOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderToPaid: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/paid`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery, useGetStripePublishableKeyQuery, usePayOrderMutation, useGetMyOrdersQuery, useGetPaymentResultsQuery, useGetOrdersQuery, useDeliveredOrderMutation, useUpdateOrderToPaidMutation } = ordersApiSlice;
