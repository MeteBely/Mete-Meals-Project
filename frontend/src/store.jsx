import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.jsx';
import cartSliceReducer from './slices/cartSlice.jsx';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer, //webde redux state tarafında görüntüleyebilirsin. cart ismiyle tutulur.
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
