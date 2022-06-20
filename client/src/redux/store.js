import { configureStore } from '@reduxjs/toolkit'; 
import sortReducer from './slices/sortSlice.js';
import gridReducer from './slices/gridSlice.js';
import cartReducer from './slices/cartSlice.js';

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    grid: gridReducer,
    cart: cartReducer
}
})