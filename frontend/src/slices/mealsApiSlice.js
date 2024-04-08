import { MEALS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const mealsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMeals: builder.query({
      query: ({ numberOfServing, date, preference }) => ({
        url: MEALS_URL,
        params: {
          numberOfServing,
          date,
          preference,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Meal'],
    }),
    getMealDetails: builder.query({
      query: (mealId) => ({
        url: `${MEALS_URL}/${mealId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Meal'],
    }),
  }),
});

export const { useGetMealsQuery, useGetMealDetailsQuery } = mealsApiSlice;
