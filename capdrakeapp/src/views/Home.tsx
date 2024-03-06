import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import {
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AuthContext } from '../domains/auth/Context';
import { ActionTypeAuth, AuthStore } from '../domains/auth/types';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { AuthService } from '../domains/services/Auth';
import { Color } from '../domains/templating/style';
import { Label } from '../domains/templating/texts/Label';
import { Title } from '../domains/templating/texts/Title';

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
	const { width } = useWindowDimensions();

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
							data: { username },
						} = res.data;
						const {
							data: { ip },
						} = await axios.get(
							'https://api.ipify.org?format=json'
						);
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
			<View style={{ flex: 1, marginTop: 64 }}>
				<ScrollView
					style={{ width }}
					contentContainerStyle={{
						marginLeft: 16,
						marginRight: 16,
						flexGrow: 1,
					}}>
					<View>
						<Carousel
							loop
							width={width - 32}
							height={200}
							autoPlay
							data={carouselData}
							scrollAnimationDuration={2000}
							renderItem={({ item }) => (
								<View
									style={{
										width: width - 32,
										height: 200,
										backgroundColor: 'black',
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<Image
										source={{ uri: item.url }}
										style={{
											width: width - 32,
											height: 200,
										}}
									/>
									<Text
										style={{
											color: Color.WHITE,
											position: 'absolute',
											fontSize: 36,
											textAlign: 'center',
											fontWeight: 'bold',
										}}>
										{item.label}
									</Text>
								</View>
							)}
						/>
						<View style={{ width: '100%', marginTop: 16 }}>
							<View
								style={{
									width: '100%',
									justifyContent: 'center',
									gap: 2.5,
									height: 75,
								}}>
								<Image
									source={{
										uri: 'https://majestycraft.com/theme/MajestyTheme/images/background/1.png',
									}}
									style={{
										marginLeft: -16,
										top: -16,
										width: width,
										height: '100%',
										position: 'absolute',
									}}
								/>
								<Label
									style={{
										color: Color.RED,
										textAlign: 'center',
										fontSize: 24,
									}}>
									BIENVENUE SUR
								</Label>
								<Title
									style={{
										color: Color.WHITE,
										textAlign: 'center',
										fontSize: 32,
									}}>
									MAJESTYCRAFT
								</Title>
							</View>
							<View style={{ marginTop: 16 }}>
								<Image
									source={{
										uri: 'https://majestycraft.com/theme/upload/panel/2021-05-13-15.46.59.png',
									}}
									style={{
										width: width - 32,
										height: 200,
									}}
								/>
							</View>
							<View style={{ marginTop: 16 }}>
								<Text
									style={{
										color: Color.GREY,
										textAlign: 'center',
										fontSize: 16,
										fontWeight: '500',
									}}>
									Créé et dirigé par une équipe passionnée, le
									serveur MajestyCraft vous embarque dans une
									aventure originale et communautaire à
									travers son nouveau mode de jeu survie, 100%
									Farm2Win.
								</Text>
							</View>
							<View
								style={{
									marginTop: 16,
								}}>
								<Image
									source={{
										uri: 'https://majestycraft.com/theme/upload/panel/hub2.png',
									}}
									style={{
										width: width - 32,
										height: 200,
									}}
								/>
								<View
									style={{
										position: 'absolute',
										width: '100%',
										height: 200,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate(
												Routes.VIDEOVIEW
											);
										}}>
										<View>
											<MaterialIcons
												name='youtube'
												size={200}
												color={'red'}
											/>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
					<Footer />
				</ScrollView>
			</View>
		</View>
	);
};
