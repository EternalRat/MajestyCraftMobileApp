import { ComponentType, useMemo, useState } from 'react';

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
}

const configViewAuth: Record<AuthViewEnum, ComponentType<ItemProps>> = {
	[AuthViewEnum.LOGIN]: Login,
	[AuthViewEnum.REGISTER]: Register,
	[AuthViewEnum.FORGOTTEN_PASSWORD]: ForgottenPass,
};

export const useAuth = () => {
	const [view, setView] = useState<AuthViewEnum>(AuthViewEnum.LOGIN);
	const AuthView = useMemo(() => configViewAuth[view], [view]);

	return {
		setView,
		AuthView,
	};
};
