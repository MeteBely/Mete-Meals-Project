import { MEMBERSHIP_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const membershipApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMembership: builder.mutation({
      query: (membershipInfo) => ({
        url: MEMBERSHIP_URL,
        method: 'POST',
        body: membershipInfo,
      }),
      keepUnusedDataFor: 5,
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: '/api/config/stripe',
      }),
      keepUnusedDataFor: 5,
    }),
    payMembership: builder.mutation({
      query: (totalPrice) => ({
        url: `${MEMBERSHIP_URL}/pay`,
        method: 'POST',
        body: totalPrice,
      }),
    }),
  }),
});

export const { useCreateMembershipMutation, useGetStripePublishableKeyQuery, usePayMembershipMutation } = membershipApiSlice;
