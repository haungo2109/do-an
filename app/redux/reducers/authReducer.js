import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const login = createAsyncThunk(
	'users/fetchByIdStatus',
	async (data, thunkAPI) => {
		const response = await userApi.login(data);
		return response;
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: { error: '', data: {} },
	reducers: {
		setAuth(state, action) {
			state = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state = Object.assign(state, { data: action.payload });
		});
		builder.addCase(login.rejected, (state, action) => {
			state = Object.assign(state, { error: action.payload });
		});
	},
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
