import { MEMBERSHIP_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

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
    getUserMembership: builder.query({
      query: (membershipId) => ({
        url: `${MEMBERSHIP_URL}/${membershipId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Memberships'],
    }),
    getMemberships: builder.query({
      query: () => ({
        url: MEMBERSHIP_URL,
      }),
      // keepUnusedDataFor: 5,
      providesTags: ['Memberships'],
    }),
    getMineMembershipId: builder.query({
      query: () => ({
        url: `${MEMBERSHIP_URL}/myMembershipId`,
      }),
      // keepUnusedDataFor: 5,
      // providesTags: ['Membership'],
    }),
    deleteMembership: builder.mutation({
      query: (membershipId) => ({
        url: `${MEMBERSHIP_URL}/${membershipId}`,
        method: 'DELETE',
      }),
    }),
    updateMembershipMealsDeliver: builder.mutation({
      query: (membershipId) => ({
        url: `${MEMBERSHIP_URL}/${membershipId}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useCreateMembershipMutation, useGetStripePublishableKeyQuery, usePayMembershipMutation, useGetUserMembershipQuery, useGetMembershipsQuery, useGetMineMembershipIdQuery, useDeleteMembershipMutation, useUpdateMembershipMealsDeliverMutation } = membershipApiSlice;
