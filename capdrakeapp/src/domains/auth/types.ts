import { Dispatch } from 'react';

import { ReducerType } from '../reducer';

export interface Auth {
	username: string;
	token: string;
	ip: string;
	isLoggedIn: boolean;
	isLoading: boolean;
	error: boolean;
}

export interface AuthStore {
	authStore: Auth;
	dispatch: Dispatch<Action>;
	login: (
		username: string,
		password: string,
		remember: boolean
	) => Promise<void>;
	logout: () => Promise<void>;
	register: (
		username: string,
		email: string,
		password: string,
		directLogin: boolean
	) => Promise<void>;
}

export enum ActionTypeAuth {
	LOGIN = 'login',
	LOGOUT = 'logout',
	LOADING = 'loading',
	ERROR = 'error',
}

export interface LoginPayloadAction {
	username: string;
	token: string;
	ip: string;
}

export type Action =
	| ({ type: ActionTypeAuth.LOGIN } & LoginPayloadAction)
	| { type: ActionTypeAuth.LOGOUT }
	| { type: ActionTypeAuth.LOADING }
	| { type: ActionTypeAuth.ERROR };

export type AuthReducer = ReducerType<ActionTypeAuth, Action, Auth>;
