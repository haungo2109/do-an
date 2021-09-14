import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

const logout = createAction('LOGOUT_USER');

export const loginAction = createAsyncThunk(
	'auth/getToken',
	async (data, thunkAPI) => {
		const response = await userApi.login(data);
		return response;
	}
);
