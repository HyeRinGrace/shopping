import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
	isLogin: boolean;
}

const initialState = { isLogin: false } as LoginState;

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		logout(state, action) {
			state.isLogin = action.payload;
		},
		login(state, action) {
			state.isLogin = action.payload;
		},
	},
});

export const { logout, login } = loginSlice.actions;
export default loginSlice.reducer;
