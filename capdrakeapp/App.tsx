import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import { AuthWrapper } from './src/domains/auth/Context';
import { MessageWrapper } from './src/domains/message/Context';
import { Message } from './src/domains/message/Message';
import { Auth } from './src/views/Auth/Auth';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? '#000' : '#fff',
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<MessageWrapper>
				<AuthWrapper>
					<Auth />
					<Message />
				</AuthWrapper>
			</MessageWrapper>
		</SafeAreaView>
	);
};

export default App;
