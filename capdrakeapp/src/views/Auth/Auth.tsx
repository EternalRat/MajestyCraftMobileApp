import React from 'react';
import { View } from 'react-native';

import { Color } from '../../domains/templating/style';
import { useAuth } from './useAuth';

export const Auth = () => {
	const { AuthView, setView, fields, setEmail, setPassword, setUsername } =
		useAuth();

	return (
		<View style={{ backgroundColor: Color.BLACK }}>
			<AuthView
				setView={setView}
				fields={fields}
				setEmail={setEmail}
				setPassword={setPassword}
				setUsername={setUsername}
			/>
		</View>
	);
};
