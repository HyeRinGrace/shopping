import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductLists } from '../models/product';

const initialState: ProductLists = {
	products: [],
};

export interface RootState {
	manage: ProductLists;
}

const manageSlice = createSlice({
	name: 'manage',
	initialState,
	reducers: {
		addToManage: (state, action) => {
			state.products.push(action.payload);
		},
		updateQuantity: (state, action: PayloadAction<{ productId: number; newQuantity: number }>) => {
			const { productId, newQuantity } = action.payload;
			const product = state.products.find(p => p.id === productId);
			if (product) {
				product.quantity = newQuantity;
			}
		},
	},
});

export const { addToManage, updateQuantity } = manageSlice.actions;

export default manageSlice.reducer;
