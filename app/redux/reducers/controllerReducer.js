import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postApi from '../../api/postApi';

export const setDataEditPost = createAsyncThunk(
	'post/fetchOnePost',
	async (id) => {
		const response = await postApi.getPost(id);
		return response;
	}
);

const controllerSlice = createSlice({
	name: 'controller',
	initialState: {
		menuPost: {
			id: 0,
			show: false,
			listChoose: ['edit', 'delete', 'report'],
			data: {},
		},
		editPost: {
			id: 0,
			show: false,
			listChoose: ['content', 'hashtag', 'images'],
			title: 'Chỉnh sửa bài đăng',
			data: {},
			handleSubmit: '',
		},
	},
	reducers: {
		setControllerMenu(state, action) {
			state = Object.assign(state, {
				menuPost: { ...state.menuPost, ...action.payload },
			});
		},
		setControllerEdit(state, action) {
			state = Object.assign(state, {
				editPost: { ...state.editPost, ...action.payload },
			});
		},
		resetDataModelEdit(state, action) {
			const data = {};
			state = Object.assign(state, {
				editPost: { ...state.editPost, data },
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setDataEditPost.fulfilled, (state, action) => {
			const data = action.payload;

			state = Object.assign(state, {
				editPost: { ...state.editPost, data },
			});
		});
	},
});

export const { setControllerMenu, setControllerEdit, resetDataModelEdit } =
	controllerSlice.actions;
export default controllerSlice.reducer;
