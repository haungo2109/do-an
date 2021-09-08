import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';

const rootReducer = {
	user: userReducer,
	auth: authReducer,
    post: postReducer,
};

export default rootReducer;
