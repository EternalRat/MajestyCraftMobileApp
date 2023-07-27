import { View } from 'react-native';
import WebView from 'react-native-webview';

import { Back } from './components/Back';
import { AuthViewEnum, ItemProps } from './useAuth';

export const ForgottenPass = ({ setView }: ItemProps) => {
	return (
		<View style={{ width: '100%', height: '100%' }}>
			<Back
				callback={() => {
					setView(AuthViewEnum.LOGIN);
				}}
			/>
			<WebView source={{ uri: 'https://majestycraft.com/' }} />
		</View>
	);
};
