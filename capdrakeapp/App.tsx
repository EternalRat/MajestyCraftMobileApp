import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import { Message } from './src/domains/message/Message';

const App = () => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? '#000' : '#fff',
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<Message />
		</SafeAreaView>
	);
};

export default App;
