import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer,
} from 'react';

import { MessageContext, MessageStore } from '../message/Context';
import { ActionTypeMessage } from '../message/types';
import { RootStackParamList, Routes } from '../routing/routesName';
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
	dispatch: () => null,
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
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList, Routes>>();

	const login = useCallback(async (username: string, password: string) => {
		dispatch({ type: ActionTypeAuth.LOADING });
		try {
			const res = await AuthService.login(username, password);
			const {
				data: { bearer },
			} = res.data;
			await AsyncStorage.setItem('token', bearer);
			dispatch({ type: ActionTypeAuth.LOGIN, username, token: bearer });
			navigation.reset({
				routes: [{ name: Routes.HOME }],
			});
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				dispatch({ type: ActionTypeAuth.ERROR });
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: error.response.data.message,
					duration: 3000,
				});
				return;
			} else {
				dispatch({ type: ActionTypeAuth.ERROR });
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: error as string,
					duration: 3000,
				});
			}
		}
	}, []);

	const logout = useCallback(async () => {
		await AsyncStorage.removeItem('token');
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
					const {
						data: { bearer },
					} = res.data;
					await AsyncStorage.setItem('token', bearer);
					dispatch({
						type: ActionTypeAuth.LOGIN,
						username,
						token: bearer,
					});
					navigation.reset({
						routes: [{ name: Routes.HOME }],
					});
				}
			} catch (error) {
				if (axios.isAxiosError(error) && error.response) {
					dispatch({ type: ActionTypeAuth.ERROR });
					dispatchMessage({
						type: ActionTypeMessage.ADD_ERROR,
						code: error.response.data.message,
						duration: 3000,
					});
				}
			}
		},
		[]
	);

	const value = useMemo(
		() => ({ authStore, login, logout, register, dispatch }),
		[authStore, login, logout, register, dispatch]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
