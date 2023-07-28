import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../domains/auth/Context';
import { AuthStore } from '../domains/auth/types';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { Color } from '../domains/templating/style';
import { Label } from '../domains/templating/texts/Label';

export const DrawerContent = (props: DrawerContentComponentProps) => {
	const { logout } = useContext<AuthStore>(AuthContext);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList, Routes>>();

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Color.BLACK,
				zIndex: 200,
			}}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{
					backgroundColor: Color.BLACK,
				}}>
				<View
					style={{
						flex: 1,
						paddingTop: 10,
					}}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View
				style={{
					bottom: 0,
					height: 46.5,
					marginHorizontal: 10,
					marginVertical: 4,
					overflow: 'hidden',
					borderRadius: 4,
				}}>
				<TouchableOpacity
					onPress={() => {
						logout().then(() =>
							navigation.reset({
								routes: [{ name: Routes.HOME }],
							})
						);
					}}>
					<View
						style={{
							height: '100%',
							padding: 8,
							flexDirection: 'row',
							borderRadius: 4,
							alignItems: 'center',
						}}>
						<MaterialIcons
							name='logout-variant'
							size={22}
							color={Color.WHITE}
						/>
						<Label
							style={{
								color: Color.WHITE,
								fontSize: 15,
								fontWeight: '500',
								marginLeft: 10,
							}}>
							Déconnexion
						</Label>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};
