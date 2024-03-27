import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: '' };

const tokenSlice = createSlice({
	name: 'isToken',
	initialState,
	reducers: {
		saveToken(state, action) {
			state.token = action.payload;
		},
	},
});

export const { saveToken } = tokenSlice.actions;
export default tokenSlice.reducer;
