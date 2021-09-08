import axiosClient from './axiosClient';

const config = {
	headers: {
		'Content-Type': 'multipart/form-data',
	},
};

const auctionApi = {
	getAuctions: () => {
		const url = '/auction/';
		return axiosClient.get(url);
	},
	postAuction: (data) => {
		const url = '/auction/';
		return axiosClient.post(url, data, config);
	},
	getAuctionOwner: () => {
		const url = '/auction/owner/';
		return axiosClient.get(url);
	},
	getAuction: (auctionId) => {
		const url = `/auction/${auctionId}`;
		return axiosClient.get(url);
	},
	getAuctionComment: (auctionId) => {
		const url = `/auction-comments/${auctionId}`;
		return axiosClient.get(url);
	},
	/**
	 *Edit auction, user Formdata
	 * @param {number} auctionId Id of Auction to update
	 * @param {{title: string, content: string, images: File}} data infor update
	 * @returns Promise
	 */
	patchAuction: (auctionId, data) => {
		const url = `/auction/${auctionId}`;
		return axiosClient.patch(url, data, config);
	},
	deleteAuction: (auctionId) => {
		const url = `/auction/${auctionId}`;
		return axiosClient.delete(url, config);
	},
	/**
	 * Use to change state of auction comment, only th owner have permission
	 * @param {number} auctionId
	 * @param {number} commentId
	 * @param {"in_process"|"success"|"fail"} stateComment
	 * @returns Promise
	 */
	changeStateAuctionComment: (auctionId, commentId, stateComment) => {
		const url = `/auction/${auctionId}/comment/${commentId}/state/${stateComment}/`;
		return axiosClient.post(url, null, config);
	},
	/**
	 * This use to create auction comment, If you had comment it will be overwrite
	 * @param {number} auctionId
	 * @param {{content: string, price: number}} data required
	 * @returns Promise
	 */
	createOrUpdateAuctionComment: (auctionId, data) => {
		const url = `/auction/${auctionId}/comments/`;
		return axiosClient.post(url, data, config);
	},
	decreateAuctionVote: (auctionId) => {
		const url = `/auction/${auctionId}/decrease-vote/`;
		return axiosClient.post(url, null, config);
	},
	increateAuctionVote: (auctionId) => {
		const url = `/auction/${auctionId}/increase-vote/`;
		return axiosClient.post(url, null, config);
	},
	/**
	 * This make a auction fail and cant be interact
	 * @param {number} auctionId
	 * @returns
	 */
	setFailAuctionState: (auctionId) => {
		const url = `/auction/${auctionId}/fail-auction/`;
		return axiosClient.post(url, null, config);
	},
};
export default auctionApi;
