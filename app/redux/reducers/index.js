import userReducer from './userReducer';
import postReducer from './postReducer';
import controllerReducer from './controllerReducer';
import commentReducer from './commentReducer';

const rootReducer = {
	user: userReducer,
	post: postReducer,
	controller: controllerReducer,
	comment: commentReducer,
};

export default rootReducer;
