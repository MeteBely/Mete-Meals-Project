import { USERBALANCE_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const balanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBalance: builder.query({
      query: () => ({
        url: USERBALANCE_URL,
      }),
      providesTags: ['Balance'],
      keepUnusedDataFor: 5,
    }),
    updateToUserBalance: builder.mutation({
      query: (amount) => ({
        url: USERBALANCE_URL,
        method: 'PUT',
        body: amount,
      }),
      invalidatesTags: ['Balance'],
    }),
  }),
});

export const { useGetUserBalanceQuery, useUpdateToUserBalanceMutation } = balanceApiSlice;
