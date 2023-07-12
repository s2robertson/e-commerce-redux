import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './productsSlice';
import categoriesSlice from './categoriesSlice';
import cartSlice from './cartSlice';

export default configureStore({
    reducer: {
        products: productsSlice,
        categories: categoriesSlice,
        cart: cartSlice
    }
});