import { MEALKITS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const mealKitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMealKits: builder.query({
      query: () => ({
        url: MEALKITS_URL,
      }),
      providesTags: ['MealKit'],
      keepUnusedDataFor: 5,
    }),
    getMealKitDetails: builder.query({
      query: (mealKitId) => ({
        url: `${MEALKITS_URL}/${mealKitId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createMealKit: builder.mutation({
      query: () => ({
        url: MEALKITS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['MealKit'],
    }),
    updateMealKit: builder.mutation({
      query: ({ mealKitId, ...data }) => ({
        url: `${MEALKITS_URL}/${mealKitId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MealKit'],
    }),
    deleteMealKit: builder.mutation({
      query: (mealKitId) => ({
        url: `${MEALKITS_URL}/${mealKitId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MealKit'],
    }),
    createReview: builder.mutation({
      query: ({ mealKitId, ...data }) => ({
        url: `${MEALKITS_URL}/${mealKitId}/reviews`,
        method: 'POST',
        body: data,
      }),
      // invalidatesTags: ['MealKit'],
    }),
  }),
});

export const { useGetMealKitsQuery, useGetMealKitDetailsQuery, useCreateMealKitMutation, useUpdateMealKitMutation, useDeleteMealKitMutation, useCreateReviewMutation } = mealKitsApiSlice;
