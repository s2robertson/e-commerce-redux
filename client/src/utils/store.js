import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './productsSlice';
import categoriesSlice from './categoriesSlice';

export default configureStore({
    reducer: {
        products: productsSlice,
        categories: categoriesSlice
    }
});