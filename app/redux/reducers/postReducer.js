import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../api/postApi';

export const getAllPostAction = createAsyncThunk(
	'post/fetchAllPost',
	async () => {
		const response = await postApi.getPosts();
		return response;
	}
);

export const likePost = createAsyncThunk('post/like', async (postId) => {
	const response = await postApi.increatePostVote(postId);
	return response;
});

export const dislikePost = createAsyncThunk('post/dislike', async (postId) => {
	const response = await postApi.decreatePostVote(postId);
	return response;
});

const postSlice = createSlice({
	name: 'post',
	initialState: {
		page: 1,
		data: [],
		error: '',
		loading: false,
		nextPage: '',
	},
	extraReducers: (builder) => {
		builder.addCase(getAllPostAction.fulfilled, (state, action) => {
			state = Object.assign(state, {
				data: action.payload.results,
				nextPage: action.payload.next,
				loading: false,
				error: '',
			});
		});
		builder.addCase(getAllPostAction.rejected, (state, action) => {
			state = Object.assign(state, {
				error: action.error.message || 'Unknown error.',
				loading: false,
			});
		});
		builder.addCase(getAllPostAction.pending, (state, action) => {
			state = Object.assign(state, {
				loading: true,
			});
		});
		builder.addCase(likePost.fulfilled, (state, action) => {
			let data = action.payload;
			let newState = state.data.map((c) =>
				c.id != data['id'] ? c : data
			);
			state = Object.assign(state, { data: newState });
		});
		builder.addCase(dislikePost.fulfilled, (state, action) => {
			let data = action.payload;
			let newState = state.data.map((c) =>
				c.id != data['id'] ? c : data
			);
			state = Object.assign(state, { data: newState });
		});
	},
});

export default postSlice.reducer;
