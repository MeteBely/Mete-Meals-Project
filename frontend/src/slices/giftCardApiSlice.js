import { GIFTCARDS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const giftCardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGiftCards: builder.query({
      query: () => ({
        url: GIFTCARDS_URL,
      }),
      providesTags: ['GiftCard'],
      keepUnusedDataFor: 5,
    }),
    getGiftCardByIdAndDelete: builder.mutation({
      query: (id) => ({
        url: `${GIFTCARDS_URL}/${id}`,
        method: 'DELETE',
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ['GiftCard'],
    }),
    payGiftCard: builder.mutation({
      query: (details) => ({
        url: `${GIFTCARDS_URL}/pay`,
        method: 'POST',
        body: details,
      }),
      invalidatesTags: ['GiftCard'],
    }),
    createGiftCardCodes: builder.mutation({
      query: (amount) => ({
        url: GIFTCARDS_URL,
        method: 'POST',
        body: amount,
      }),
      invalidatesTags: ['GiftCard'],
    }),
  }),
});

export const { useGetGiftCardsQuery, useGetGiftCardByIdAndDeleteMutation, usePayGiftCardMutation, useCreateGiftCardCodesMutation } = giftCardsApiSlice;
