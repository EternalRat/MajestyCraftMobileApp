import { createDrawerNavigator } from '@react-navigation/drawer';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { DrawerContent } from '../../components/Drawer';
import { Auth } from '../../views/Auth/Auth';
import { Home } from '../../views/Home';
import { Vote } from '../../views/Vote';
import { Color } from '../templating/style';
import { RootStackParamList, Routes } from './routesName';

const Drawer = createDrawerNavigator<RootStackParamList>();

const Stack = createSharedElementStackNavigator();

enableScreens();

export const MajesticRouter = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				headerShown: false,
			}}>
			<Stack.Screen
				name='Drawer'
				component={() => (
					<Drawer.Navigator
						drawerContent={props => <DrawerContent {...props} />}
						initialRouteName={Routes.HOME}
						screenOptions={{
							drawerActiveBackgroundColor: Color.ORANGE,
							drawerActiveTintColor: '#333',
							drawerInactiveTintColor: Color.WHITE,
							drawerLabelStyle: {
								fontFamily: 'Roboto-Medium',
								fontSize: 15,
							},
							drawerPosition: 'left',
							drawerType: 'front',
							swipeEdgeWidth: Platform.OS === 'android' ? 180 : 0,
						}}>
						<Drawer.Screen
							name={Routes.HOME}
							component={Home}
							options={{ headerShown: false }}
						/>
						<Drawer.Screen
							name={Routes.AUTH}
							component={Auth}
							options={{ headerShown: false }}
						/>
						<Drawer.Screen name={Routes.VOTE} component={Vote} />
					</Drawer.Navigator>
				)}
			/>
		</Stack.Navigator>
	);
};
