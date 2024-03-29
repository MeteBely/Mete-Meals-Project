import { GIFTCARDS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const giftCardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGiftCards: builder.query({
      query: () => ({
        url: GIFTCARDS_URL,
      }),
      providesTags: ['GiftCard'],
      keepUnusedDataFor: 5,
    }),
    createGiftCards: builder.mutation({
      query: (details) => ({
        url: GIFTCARDS_URL,
        method: 'POST',
        body: details,
      }),
      invalidatesTags: ['GiftCard'],
    }),
    payGiftCard: builder.mutation({
      query: (details) => ({
        url: `${GIFTCARDS_URL}/pay`,
        method: 'POST',
        body: details,
      }),
    }),
    createGiftCardCodes: builder.mutation({
      query: (amount) => ({
        url: GIFTCARDS_URL,
        method: 'POST',
        body: amount,
      }),
    }),
  }),
});

export const { useGetGiftCardsQuery, useCreateGiftCardsMutation, usePayGiftCardMutation, useCreateGiftCardCodesMutation } = giftCardsApiSlice;
