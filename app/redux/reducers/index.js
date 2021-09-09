import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import controllerReducer from './controllerReducer';

const rootReducer = {
	user: userReducer,
	auth: authReducer,
	post: postReducer,
	controller: controllerReducer,
};

export default rootReducer;
