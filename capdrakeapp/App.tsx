import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthWrapper } from './src/domains/auth/Context';
import { MessageWrapper } from './src/domains/message/Context';
import { Message } from './src/domains/message/Message';
import { MajesticRouter } from './src/domains/routing/Routes';
import { Color } from './src/domains/templating/style';

const App = () => {
	return (
		<SafeAreaView style={{ backgroundColor: Color.BLACK, flex: 1 }}>
			<NavigationContainer>
				<MessageWrapper>
					<AuthWrapper>
						<GestureHandlerRootView
							style={{
								flex: 1,
							}}>
							<MajesticRouter />
						</GestureHandlerRootView>
						<Message />
					</AuthWrapper>
				</MessageWrapper>
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default App;
