import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';
import cartSliceReducer from './slices/cartSlice.js';
import authSliceReducer from './slices/authSlice.js';
import giftCardSliceReducer from './slices/giftCardSlice.js';
import membershipDetailReducer from './slices/membershipDetailSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer, //webde redux state tarafında görüntüleyebilirsin. cart ismiyle tutulur.
    auth: authSliceReducer,
    giftCard: giftCardSliceReducer,
    membershipDetail: membershipDetailReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
