import {
	Action,
	ActionTypeAuth,
	Auth,
	AuthReducer,
	LoginPayloadAction,
} from './types';

const configReducer: AuthReducer = {
	[ActionTypeAuth.LOGIN]: (state: Auth, action: Action) => {
		localStorage.setItem('token', (action as LoginPayloadAction).token);
		return {
			username: (action as LoginPayloadAction).username,
			token: (action as LoginPayloadAction).token,
			isLoggedIn: true,
			isLoading: false,
			error: false,
		};
	},
	[ActionTypeAuth.LOGOUT]: (_state: Auth) => {
		localStorage.removeItem('token');
		return {
			username: '',
			token: '',
			isLoggedIn: false,
			isLoading: false,
			error: false,
		};
	},
	[ActionTypeAuth.LOADING]: (state: Auth) => {
		return {
			...state,
			isLoading: true,
		};
	},
	[ActionTypeAuth.ERROR]: (state: Auth) => {
		return {
			...state,
			error: true,
		};
	},
};

export const authReducer = (state: Auth, action: Action) => {
	try {
		return configReducer[action.type](state, action);
	} catch (error) {
		console.error('reducer:error', error);
		return state;
	}
};
