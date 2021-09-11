import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import converUri from '../../utils/ConverUri';

export const getCurrenUserAction = createAsyncThunk(
	'users/fetchCurrentUser',
	async () => {
		const response = await userApi.getCurrentUserInfo();
		return response;
	}
);
export const updateCurrenUserAction = createAsyncThunk(
	'users/updateCurrentUser',
	async ({ id, data }) => {
		const response = await userApi.updateCurrentUserInfo(id, data);
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
		builder.addCase(updateCurrenUserAction.fulfilled, (state, action) => {
			action.payload.avatar = converUri(action.payload.avatar);
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
