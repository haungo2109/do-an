import authReducer from '../reducers/authReducer';
import userReducer from '../reducers/userReducer';

const rootReducer = {
	user: userReducer,
	auth: authReducer,
};

export default rootReducer;
