import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import WebView from 'react-native-webview';

import { Back } from '../../components/Back';
import { RootStackParamList, Routes } from '../../domains/routing/routesName';

export const VideoWebView = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList, Routes>>();

	return (
		<View style={{ width: '100%', height: '100%' }}>
			<View
				style={{
					height: 60,
					backgroundColor: '#0f0f0f',
				}}>
				<Back
					callback={() => {
						navigation.navigate(Routes.HOME);
					}}
				/>
			</View>
			<WebView
				source={{ uri: 'https://www.youtube.com/watch?v=8pcGs5sgEaos' }}
			/>
		</View>
	);
};
