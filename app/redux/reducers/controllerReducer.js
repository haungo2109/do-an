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
		imageSelection: {
			show: false,
			images: null,
			min: 1,
			max: 10,
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
		setControllerImageSelection(state, action) {
			state = Object.assign(state, {
				imageSelection: { ...state.imageSelection, ...action.payload },
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

export const {
	setControllerMenu,
	setControllerEdit,
	setControllerImageSelection,
} = controllerSlice.actions;
export default controllerSlice.reducer;
