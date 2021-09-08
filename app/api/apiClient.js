const Axios = require('axios');
import { setData, getData } from '../utils/AsyncStorage';
export const baseURL = 'http://192.168.1.21:5000';
export const client_id = 'TPLrxQE8mF9slRzevZSNbNCLQXDSSbJrnIprMCNM';
export const client_secret =
	'QRHKVKgNnYo8GmwvxUfFtJRAtvtoLTD4mDoNtWzxulgFhrY8rssWssFglvAvZxZpm2vHHBY2nIJDHETm3SOONxD0ADRKL0ald5Ip8hCoUeOAxQn8KipFFjkU64LlzlCQ';

const api = new Axios.create({
	baseURL,
	headers: {
		Accept: '*/*',
		'Content-Type': 'multipart/form-data',
	},
	// withCredentials: true,
});

const handleError = (error) => {
	if (error.message) return Promise.reject(error.message);

	return Promise.reject(mess);
};

api.interceptors.request.use(async function (config) {
	const auth = await getData('Authorization');
	if (auth) config.headers['Authorization'] = auth;
	return config;
}, handleError);

api.interceptors.response.use(function (res) {
    // debugger;
	if (res?.data?.access_token) {
		setData('Authorization', `Bearer ${res?.data?.access_token}`);
		setData('refresh_token', res?.data?.refresh_token);
	}
	if (res?.data) {
		return res.data;
	}

	return res;
}, handleError);

export default api;
