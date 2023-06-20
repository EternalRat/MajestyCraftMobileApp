import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { View } from 'react-native';

import { AuthContext } from '../domains/auth/Context';
import { ActionTypeAuth, AuthStore } from '../domains/auth/types';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { AuthService } from '../domains/services/Auth';
import { Color } from '../domains/templating/style';

type Props = NativeStackScreenProps<RootStackParamList, Routes.HOME>;

export const Home = ({ navigation }: Props) => {
	const { dispatch } = useContext<AuthStore>(AuthContext);

	useEffect(() => {
		AsyncStorage.getItem('token').then(token => {
			if (!token) {
				dispatch({ type: ActionTypeAuth.LOGOUT });
				navigation.reset({
					index: 0,
					routes: [{ name: Routes.AUTH }],
				});
				return;
			}
			AuthService.healthAuth(token).then(res => {
				if (res.status === 200) {
					const { username } = res.data;
					dispatch({ type: ActionTypeAuth.LOGIN, username, token });
				} else {
					dispatch({ type: ActionTypeAuth.LOGOUT });
				}
			});
		});
	}, []);

	return (
		<View style={{ backgroundColor: Color.BLACK, height: '100%' }}>
			
		</View>
	);
};
