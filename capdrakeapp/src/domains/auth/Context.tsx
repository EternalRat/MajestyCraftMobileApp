import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';

import { MessageContext, MessageStore } from '../message/Context';
import { ActionTypeMessage } from '../message/types';
import { AuthService } from '../services/Auth';
import { authReducer } from './reducer';
import { ActionTypeAuth, AuthStore } from './types';

export const defaultAuthStore: AuthStore = {
	authStore: {
		username: '',
		token: '',
		isLoggedIn: false,
		isLoading: true,
		error: false,
	},
	login: (_username: string, _password: string) => Promise.resolve(),
	logout: () => Promise.resolve(),
	register: (
		_username: string,
		_email: string,
		_password: string,
		_directLogin: boolean
	) => Promise.resolve(),
};

export const AuthContext = createContext<AuthStore>(defaultAuthStore);

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
	const [authStore, dispatch] = useReducer(
		authReducer,
		defaultAuthStore.authStore
	);
	const { dispatch: dispatchMessage } =
		useContext<MessageStore>(MessageContext);

	const login = useCallback(async (username: string, password: string) => {
		dispatch({ type: ActionTypeAuth.LOADING });
		try {
			const res = await AuthService.login(username, password);
			const { token } = res.data;
			dispatch({ type: ActionTypeAuth.LOGIN, username, token });
		} catch (error) {
			dispatch({ type: ActionTypeAuth.ERROR });
			dispatchMessage({
				type: ActionTypeMessage.ADD_ERROR,
				code: 'LOGIN_FAILED',
				duration: 3000,
			});
		}
	}, []);

	const logout = useCallback(async () => {
		dispatch({ type: ActionTypeAuth.LOGOUT });
	}, []);

	const register = useCallback(
		async (
			username: string,
			email: string,
			password: string,
			directLogin: boolean
		) => {
			dispatch({ type: ActionTypeAuth.LOADING });
			try {
				await AuthService.register(username, email, password);
				if (directLogin) {
					const res = await AuthService.login(username, password);
					const { token } = res.data;
					dispatch({
						type: ActionTypeAuth.LOGIN,
						username,
						token,
					});
				}
			} catch (error) {
				dispatch({ type: ActionTypeAuth.ERROR });
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: 'REGISTER_FAILED',
					duration: 3000,
				});
			}
		},
		[]
	);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch({ type: ActionTypeAuth.LOGOUT });
			return;
		}
		AuthService.healthAuth(token).then(res => {
			if (res.status === 200) {
				const { username } = res.data;
				dispatch({ type: ActionTypeAuth.LOGIN, username, token });
			} else {
				dispatch({ type: ActionTypeAuth.LOGOUT });
			}
		});
	}, []);

	const value = useMemo(
		() => ({ authStore, login, logout, register }),
		[authStore, login, logout, register]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
