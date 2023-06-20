import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ComponentType, useCallback, useMemo, useState } from 'react';

import { RootStackParamList, Routes } from '../../domains/routing/routesName';
import { ForgottenPass } from './ForgottenPass';
import { Login } from './Login';
import { Register } from './Register';

export enum AuthViewEnum {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
	FORGOTTEN_PASSWORD = 'FORGOTTEN_PASSWORD',
}

export interface ItemProps {
	setView: (view: AuthViewEnum) => void;
	fields: AuthFields;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	setUsername: (username: string) => void;
	navigation: NativeStackNavigationProp<
		RootStackParamList,
		Routes,
		undefined
	>;
}

export interface AuthFields {
	email: string;
	password: string;
	username: string;
	age: number;
}

const configViewAuth: Record<AuthViewEnum, ComponentType<ItemProps>> = {
	[AuthViewEnum.LOGIN]: Login,
	[AuthViewEnum.REGISTER]: Register,
	[AuthViewEnum.FORGOTTEN_PASSWORD]: ForgottenPass,
};

export const useAuth = () => {
	const [view, setView] = useState<AuthViewEnum>(AuthViewEnum.LOGIN);
	const [fields, setFields] = useState<AuthFields>({
		email: '',
		password: '',
		username: '',
		age: 0,
	});
	const AuthView = useMemo(() => configViewAuth[view], [view]);

	const setEmail = useCallback((email: string) => {
		setFields(prev => ({ ...prev, email }));
	}, []);

	const setPassword = useCallback((password: string) => {
		setFields(prev => ({ ...prev, password }));
	}, []);

	const setUsername = useCallback((username: string) => {
		setFields(prev => ({ ...prev, username }));
	}, []);

	return {
		setView,
		AuthView,
		fields,
		setEmail,
		setPassword,
		setUsername,
	};
};
