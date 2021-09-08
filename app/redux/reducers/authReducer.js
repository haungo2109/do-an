import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const loginAction = createAsyncThunk(
	'auth/getToken',
	async (data, thunkAPI) => {
		const response = await userApi.login(data);
		return response;
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: { error: '', data: {}, loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginAction.fulfilled, (state, action) => {
			state = Object.assign(state, {
				data: action.payload,
				loading: false,
			});
		});
		builder.addCase(loginAction.rejected, (state, action) => {
			state = Object.assign(state, {
				error: action.error.message || 'Unknown error.',
				loading: false,
			});
		});
		builder.addCase(loginAction.pending, (state) => {
			state = Object.assign(state, {
				loading: true,
			});
		});
	},
});

export default authSlice.reducer;
