import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.jsx';
import cartSliceReducer from './slices/cartSlice.jsx';
import authSliceReducer from './slices/authSlice.jsx';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer, //webde redux state tarafında görüntüleyebilirsin. cart ismiyle tutulur.
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
