import { useMemo, useState } from 'react';
import { Text } from 'react-native';

import { Login } from './Login';

export enum AuthView {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
	FORGOTTEN_PASSWORD = 'FORGOTTEN_PASSWORD',
}

const configViewAuth: Record<AuthView, JSX.Element> = {
	[AuthView.LOGIN]: <Login />,
	[AuthView.REGISTER]: <Text>REGISTER</Text>,
	[AuthView.FORGOTTEN_PASSWORD]: <Text>FORGOTTEN_PASSWORD</Text>,
};

export const useAuth = () => {
	const [view, setView] = useState<AuthView>(AuthView.LOGIN);
	const authView = useMemo(() => configViewAuth[view], [view]);

	return {
		setView,
		authView,
	};
};
