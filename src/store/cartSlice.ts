import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductInterface } from '../models/product';
// import { useState } from 'react';

export const addToCart = createAction<{
	product: ProductInterface;
	quantity: number;
	option: string; // New field to represent the selected size option
}>('cart/add');
// createAction<{ product: ProductInterface, quantity: number }>("cart/add");

interface CartState {
	products: ProductInterface[];
}

// 초기 장바구니 상태 정의
const initialState: CartState = {
	products: [],
};

// 장바구니에 대한 슬라이스 생성
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// 상품 목록 설정
		setProducts: (state, action: PayloadAction<ProductInterface[]>) => {
			state.products = action.payload;
		},
		// 상품 수량 증가
		increaseQuantity: (state, action: PayloadAction<number>) => {
			const currentQuantity = Number(state.products[action.payload].quantity) || 0;
			state.products[action.payload].quantity = currentQuantity + 1;
		},
		// 상품 수량 감소 (최소 1로 유지)
		decreaseQuantity: (state, action: PayloadAction<number>) => {
			const currentQuantity = Number(state.products[action.payload].quantity) || 0;
			state.products[action.payload].quantity = Math.max(1, currentQuantity - 1);
		},
		// 상품 삭제
		removeProduct: (state, action: PayloadAction<number>) => {
			state.products.splice(action.payload, 1);
		},
	},

	extraReducers: builder => {
		builder.addCase(addToCart, (state, action) => {
			const existingProduct = state.products.find(
				product =>
					product.id === action.payload.product.id && product.option === action.payload.option
			);

			if (existingProduct) {
				existingProduct.quantity += action.payload.quantity;
			} else {
				state.products.push({
					...action.payload.product,
					quantity: action.payload.quantity,
					option: action.payload.option,
				});
			}
		});
	},
});

export const { setProducts, increaseQuantity, decreaseQuantity, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
