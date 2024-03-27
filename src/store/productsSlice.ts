import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 초기값
const initialState = {
	data: [],
};

interface ProductsState {
	products: any;
	data: Product | null;
	message: string;
	status: string;
}

interface Product {
	title?: string;
	brand: string;
	deliveryPrice: number;
	description: string;
	discountRate: number;
	imageType: string;
	imageUrl: string;
	isDiscount: boolean;
	isNew: boolean;
	name: string;
	optionList: any[];
	price: number;
	saleEndDate: string;
	saleStartDate: string;
}

export type { ProductsState };

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		// setProductsData: (state, action) => {
		//     state.data = action.payload;
		// },
	},
	extraReducers: builder => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.data = action.payload;
		});
	},
});

export const { reducer: productsReducer, actions } = productsSlice;
// export const { setProductsData } = actions;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	try {
		const response = await fetch('https://shoppingmall.o-r.kr/api/v1/products/1');

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
});

export const selectProductData = (state: { products: ProductsState }) => state.products.data;
export default productsReducer;
