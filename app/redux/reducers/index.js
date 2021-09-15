import userReducer from './userReducer';
import postReducer from './postReducer';
import controllerReducer from './controllerReducer';
import commentReducer from './commentReducer';
import auctionReducer from './auctionReducer';

const rootReducer = {
	user: userReducer,
	post: postReducer,
	auction: auctionReducer,
	controller: controllerReducer,
	comment: commentReducer,
};

export default rootReducer;
