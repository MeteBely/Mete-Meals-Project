import { createSlice } from '@reduxjs/toolkit';
const initialState = localStorage.getItem('giftCards') ? JSON.parse(localStorage.getItem('giftCards')) : { giftCardItems: [] };

const giftCardSlice = createSlice({
  name: 'giftCard',
  initialState,
  reducers: {
    addToGiftCardItems: (state, action) => {
      state.giftCardItems = action.payload;
      localStorage.setItem('giftCards', JSON.stringify(action.payload));
      //   return state;
    },
    clearGiftCardItems: (state, action) => {
      localStorage.removeItem('giftCards');
      state.giftCardItems = [];
    },
  },
});

export const { addToGiftCardItems, clearGiftCardItems } = giftCardSlice.actions;

export default giftCardSlice.reducer;

//localStorage.setItem('cart', JSON.stringify(state));
// return state;
