import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
};

const productsSlice = createSlice({
	name: 'testProducts',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setProducts } = productsSlice.actions;
export const selectProducts = (state: any) => state.testProducts;
export const testProductsReducer = productsSlice.reducer;
