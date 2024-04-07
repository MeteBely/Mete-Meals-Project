import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/CartUtils.js';
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'Stripe' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Eklenen item varsa eskisinin yerine yeni halini ekler, yoksa direkt ekler.
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existItem = state.cartItems.find((item) => item._id === newItem._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((item) => (item._id === newItem._id ? newItem : item));
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const removeItemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== removeItemId);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
