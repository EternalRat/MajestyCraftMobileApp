import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DrawerContent } from '../../components/Drawer';
import { Auth } from '../../views/Auth/Auth';
import { Home } from '../../views/Home';
import { TopVotes } from '../../views/TopVoteurs';
import { Vote } from '../../views/Vote/Vote';
import { Color } from '../templating/style';
import { RootStackParamList, Routes } from './routesName';

const Drawer = createDrawerNavigator<RootStackParamList>();

enableScreens();

export const MajesticRouter = () => {
	return (
		<Drawer.Navigator
			drawerContent={props => <DrawerContent {...props} />}
			initialRouteName={Routes.HOME}
			screenOptions={{
				headerShown: false,
				drawerActiveBackgroundColor: Color.ORANGE,
				drawerActiveTintColor: '#333',
				drawerInactiveTintColor: Color.WHITE,
				drawerLabelStyle: {
					fontSize: 15,
					marginLeft: -25,
				},
				drawerPosition: 'left',
				drawerType: 'front',
				swipeEdgeWidth: Platform.OS === 'android' ? 180 : 0,
			}}>
			<Drawer.Screen
				name={Routes.HOME}
				component={Home}
				options={{
					drawerLabel: 'Accueil',
					drawerIcon: ({ color }) => (
						<Ionicons name='home-outline' size={22} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name={Routes.AUTH}
				component={Auth}
				options={{
					drawerItemStyle: {
						display: 'none',
					},
				}}
			/>
			<Drawer.Screen
				name={Routes.VOTE}
				component={Vote}
				options={{
					drawerIcon: ({ color }) => (
						<MaterialIcons name='vote' size={22} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name={Routes.TOPVOTE}
				component={TopVotes}
				options={{
					drawerLabel: 'Top Voteurs',
					drawerIcon: ({ color }) => (
						<MaterialIcons name='vote' size={22} color={color} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};
