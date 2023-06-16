import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { AuthWrapper } from './src/domains/auth/Context';
import { MessageWrapper } from './src/domains/message/Context';
import { Message } from './src/domains/message/Message';
import { MajesticRouter } from './src/domains/routing/Routes';
import { Color } from './src/domains/templating/style';

const App = () => {
	return (
		<SafeAreaView style={{ backgroundColor: Color.BLACK, height: '100%' }}>
			<NavigationContainer>
				<MessageWrapper>
					<AuthWrapper>
						<MajesticRouter />
						<Message />
					</AuthWrapper>
				</MessageWrapper>
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default App;
