import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getCurrenUserAction = createAsyncThunk(
	'users/fetchCurrentUser',
	async () => {
		const response = await userApi.getCurrentUserInfo();
		return response;
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setUser(state, action) {
			state = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrenUserAction.fulfilled, (state, action) => {
			state = Object.assign(state, action.payload);
		});
		builder.addCase(getCurrenUserAction.rejected, (state, action) => {
			state = Object.assign(state, {
				error: action.error.message || 'Unknown error.',
			});
		});
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
