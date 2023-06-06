import React from 'react';

import { useAuth } from './useAuth';

export const Auth = () => {
	const { AuthView, setView } = useAuth();

	return <AuthView setView={setView} />;
};
