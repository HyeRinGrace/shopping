import { createSlice } from '@reduxjs/toolkit';

interface signupState {
	name: string;
	email: string;
	password: string;
	phoneNumber: string;
	sex: string;
	profileImgUrl: string;
	introduce: string;
	mainAddress: string;
	subAddress: string;
}

const initialState = {
	name: '',
	email: '',
	password: '',
	phoneNumber: '',
	sex: '',
	profileImgUrl: 'https://i.stack.imgur.com/frlIf.png',
	introduce: '',
	mainAddress: '',
	subAddress: '',
} as signupState;

const signupSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		setting(state, action) {
			// 이전의 상태를 보존하면서 새로운 상태 반영
			const newState = { ...state };
			return { ...newState, ...action.payload };
		},
	},
});

export const { setting } = signupSlice.actions;
export default signupSlice.reducer;
