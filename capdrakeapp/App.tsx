import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import { Message } from './src/domains/message/Message';
import { Login } from './src/views/Login';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? '#000' : '#fff',
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<Login />
			<Message />
		</SafeAreaView>
	);
};

export default App;
