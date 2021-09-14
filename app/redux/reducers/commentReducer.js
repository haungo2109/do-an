import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../api/postApi';

export const fetchComment = createAsyncThunk(
	'comment/fetchComment',
	async (id, thunkAPI) => {
		const response = await postApi.getPostComment(id);
		return response;
	}
);

const commentSlice = createSlice({
	name: 'comment',
	initialState: { error: '', data: [], loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchComment.fulfilled, (state, action) => {
            state.data = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchComment.rejected, (state, action) => {
			state = Object.assign(state, {
				error: action.error.message || 'Unknown error.',
				loading: false,
			});
		});
		builder.addCase(fetchComment.pending, (state) => {
			state = Object.assign(state, {
				loading: true,
			});
		});
	},
});

export default commentSlice.reducer;
