import { createSlice } from '@reduxjs/toolkit';
const initialState = localStorage.getItem('giftCards') ? JSON.parse(localStorage.getItem('giftCards')) : { giftCardItems: [], giftCardCodes: [] };

const giftCardSlice = createSlice({
  name: 'giftCard',
  initialState,
  reducers: {
    addToGiftCardItems: (state, action) => {
      state.giftCardItems = action.payload;
      localStorage.setItem('giftCards', JSON.stringify(state));
    },
    clearGiftCardItems: (state) => {
      localStorage.removeItem('giftCards');
      state.giftCardItems = [];
    },
    saveGiftCardCodes: (state, action) => {
      state.giftCardCodes = action.payload;
      localStorage.setItem('giftCards', JSON.stringify(state));
      // kodları localde tutmak güvenlik açığına sebebiyet verebilir, iyi bir yol bulmaya çalış daha sonra.
    },
  },
});

export const { addToGiftCardItems, clearGiftCardItems, saveGiftCardCodes } = giftCardSlice.actions;

export default giftCardSlice.reducer;
