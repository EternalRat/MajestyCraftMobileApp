import React from 'react';

import { useAuth } from './useAuth';

export const Auth = () => {
	const { AuthView, setView, fields, setEmail, setPassword, setUsername } =
		useAuth();

	return (
		<AuthView
			setView={setView}
			fields={fields}
			setEmail={setEmail}
			setPassword={setPassword}
			setUsername={setUsername}
		/>
	);
};
