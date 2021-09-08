import Frisbee from 'frisbee';
import { setData, getData } from '../utils/AsyncStorage';
export const baseURI = 'http://192.168.1.21:5000';
export const client_id = 'TPLrxQE8mF9slRzevZSNbNCLQXDSSbJrnIprMCNM';
export const client_secret =
	'QRHKVKgNnYo8GmwvxUfFtJRAtvtoLTD4mDoNtWzxulgFhrY8rssWssFglvAvZxZpm2vHHBY2nIJDHETm3SOONxD0ADRKL0ald5Ip8hCoUeOAxQn8KipFFjkU64LlzlCQ';

const api = new Frisbee({
	baseURI,
	headers: {
		Accept: '*/*',
		'Content-Type': 'multipart/form-data',
	},
	mode: 'cors',
	credentials: 'omit',
});

api.interceptor.register({
	request: (path, options) => {
		const Authorization = getData('Authorization');
		if (Authorization) options.headers['Authorization'] = Authorization;
		return [path, options];
	},
	response: function (res) {
		if (res?.body?.access_token)
			setData('Authorization', `Bearer ${res?.data?.access_token}`);
		if (res?.data) {
			return res.data;
		} else if (res?.body) {
			return res.body;
		}
		return res;
	},
	responseError: function (err) {
		return Promise.reject(err);
	},
});

export default api;
