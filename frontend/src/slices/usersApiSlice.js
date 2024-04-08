import { USERS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
      providesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
      providesTags: ['User'],
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } = usersApiSlice;
