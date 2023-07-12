import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        entries: [],
        current: ''
    },
    reducers: {
        updateCategories(state, action) {
            state.entries = action.payload;
        },
        updateCurrentCategory(state, action) {
            state.current = action.payload;
        }
    }
});

export const { updateCategories, updateCurrentCategory } = categoriesSlice.actions;
export const categoriesSelector = (state) => state.categories;
export default categoriesSlice.reducer;