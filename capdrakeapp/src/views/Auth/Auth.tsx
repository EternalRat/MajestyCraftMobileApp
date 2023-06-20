import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

import { RootStackParamList, Routes } from '../../domains/routing/routesName';
import { Color } from '../../domains/templating/style';
import { useAuth } from './useAuth';

type Props = NativeStackScreenProps<RootStackParamList, Routes.AUTH>;

export const Auth = ({ navigation }: Props) => {
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
				navigation={navigation}
			/>
		</View>
	);
};
