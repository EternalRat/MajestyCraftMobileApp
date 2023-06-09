import React from 'react';
import { View } from 'react-native';

import { Color } from '../../domains/templating/style';
import { useAuth } from './useAuth';

export const Auth = () => {
	const { AuthView, setView } = useAuth();

	return (
		<View style={{ backgroundColor: Color.WHITE }}>
			<AuthView setView={setView} />
		</View>
	);
};
