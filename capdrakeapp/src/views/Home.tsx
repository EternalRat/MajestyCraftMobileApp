import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { useContext, useEffect } from 'react';
import {
	Image,
	ScrollView,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AuthContext } from '../domains/auth/Context';
import { ActionTypeAuth, AuthStore } from '../domains/auth/types';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { AuthService } from '../domains/services/Auth';
import { Color } from '../domains/templating/style';

type Props = DrawerScreenProps<RootStackParamList, Routes.HOME>;

const carouselData = [
	{
		url: 'https://majestycraft.com/theme/upload/panel/hubsansretouche.png',
		label: '3 Modes de jeu inédits',
	},
	{
		url: 'https://majestycraft.com/theme/upload/panel/savoir-faire.jpg',
		label: 'Un savoir-faire unique',
	},
	{
		url: 'https://majestycraft.com/theme/upload/panel/build.jpg',
		label: "Des builds d'exception",
	},
];

export const Home = ({ navigation }: Props) => {
	const { dispatch, logout } = useContext<AuthStore>(AuthContext);
	const { width, height } = useWindowDimensions();

	useEffect(() => {
		AsyncStorage.getItem('token').then(token => {
			if (!token) {
				dispatch({ type: ActionTypeAuth.LOGOUT });
				navigation.reset({
					routes: [{ name: Routes.AUTH }],
				});
				return;
			}
			AuthService.healthAuth(token)
				.then(async res => {
					if (res.status === 200) {
						const {
							data: { username, ip },
						} = res.data;
						dispatch({
							type: ActionTypeAuth.LOGIN,
							username,
							token,
							ip,
						});
					} else {
						await logout();
					}
				})
				.catch(async () => {
					await logout();
				});
		});
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: Color.BLACK }}>
			<Header navigation={navigation} />
			<ScrollView>
				<View
					style={{
						height: height - 64,
					}}>
					<Carousel
						loop
						width={width}
						height={200}
						autoPlay
						data={carouselData}
						scrollAnimationDuration={2000}
						renderItem={({ item }) => (
							<View
								style={{
									width,
									height: 200,
									backgroundColor: 'black',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Image
									source={{ uri: item.url }}
									style={{ width, height: 200 }}
								/>
								<Text
									style={{
										color: Color.WHITE,
										position: 'absolute',
										fontSize: 36,
										textAlign: 'center',
										fontFamily: 'Roboto Condensed',
										fontWeight: 'bold',
									}}>
									{item.label}
								</Text>
							</View>
						)}
					/>
				</View>
				<Footer />
			</ScrollView>
		</View>
	);
};
