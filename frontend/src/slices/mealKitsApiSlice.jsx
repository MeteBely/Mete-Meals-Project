import { MEALKITS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const mealKitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMealKits: builder.query({
      query: () => ({
        url: MEALKITS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMealKitDetails: builder.query({
      query: (mealKitId) => ({
        url: `${MEALKITS_URL}/${mealKitId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetMealKitsQuery, useGetMealKitDetailsQuery } = mealKitsApiSlice;
