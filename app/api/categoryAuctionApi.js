import axiosClient from './axiosClient';

const categoryAuctionApi = {
	getCategoryAuction: () => {
		const url = '/category/';
		return axiosClient.get(url);
	},
};
export default categoryAuctionApi;
