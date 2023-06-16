import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Auth } from '../../views/Auth/Auth';
import { Home } from '../../views/Home';
import { RootStackParamList, Routes } from './routesName';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MajesticRouter = () => {
	return (
		<Stack.Navigator
			initialRouteName={Routes.HOME}
			screenOptions={{ headerShown: false }}>
			<Stack.Screen name={Routes.HOME} component={Home} />
			<Stack.Screen name={Routes.AUTH} component={Auth} />
		</Stack.Navigator>
	);
};
