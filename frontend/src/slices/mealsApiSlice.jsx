import { MEALS_URL } from '../constants';
import { apiSlice } from './apiSlice';

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
    }),
    getMealDetails: builder.query({
      query: (mealId) => ({
        url: `${MEALS_URL}/${mealId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetMealsQuery, useGetMealDetailsQuery } = mealsApiSlice;
