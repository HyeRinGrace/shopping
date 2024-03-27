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
			// state.name = action.payload.name;
			// state.email = action.payload.email;
			// state.password = action.payload.password;
			// state.phoneNumber = action.payload.phoneNumber;
			// state.sex = action.payload.sex;
			// state.profileImgUrl = action.payload.profileImgUrl;
			// state.introduce = action.payload.introduce;
			// state.mainAddress = action.payload.mainAddress;
			// state.subAddress = action.payload.subAddress;
			const newState = { ...state };
			return { ...newState, ...action.payload };
		},
	},
});

export const { setting } = signupSlice.actions;
export default signupSlice.reducer;
