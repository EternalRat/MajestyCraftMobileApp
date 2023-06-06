import React from 'react';

import { useAuth } from './useAuth';

export const Auth = () => {
	const { authView } = useAuth();

	return <>{authView}</>;
};
