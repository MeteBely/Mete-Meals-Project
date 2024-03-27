import { ORDERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
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
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
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
    }),
    deliveredOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/paid`,
        method: 'PUT',
      }),
    }),
    PayToGiftCardOrder: builder.mutation({
      query: (details) => ({
        url: `${ORDERS_URL}/giftcard`,
        method: 'POST',
        body: details,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery, useGetStripePublishableKeyQuery, usePayOrderMutation, useGetMyOrdersQuery, useGetPaymentResultsQuery, useGetOrdersQuery, useDeliveredOrderMutation, useUpdateOrderToPaidMutation, usePayToGiftCardOrderMutation } = ordersApiSlice;
