import { DrawerScreenProps } from '@react-navigation/drawer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { Color } from '../domains/templating/style';

type Props = DrawerScreenProps<RootStackParamList, Routes.TOPVOTE>;

interface TopVoteurs {
	pseudo: string;
	nombre: number;
	url: string;
}

const COLORS = [Color.FIRST_PLACE, Color.SECOND_PLACE, Color.THIRD_PLACE];

export const TopVotes = ({ navigation }: Props) => {
	const [topVotes, setTopVotes] = useState<TopVoteurs[]>([]);

	useEffect(() => {
		axios
			.get('https://majestycraft.com/index.php?action=getBaltopVote')
			.then(res => {
				const { data }: { data: string } = res;
				const votes = data.slice('[DIV]'.length);
				const json = JSON.parse(votes).slice(0, 10);
				setTopVotes(json);
			});
	}, []);

	return (
		<View style={{ backgroundColor: Color.BLACK, flex: 1 }}>
			<Header navigation={navigation} />
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						top: 64,
						marginHorizontal: 24,
						padding: 8,
					}}>
					<View
						style={{
							flex: 0.05,
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<View style={{ width: '12%' }}>
							<Text
								style={{
									color: Color.WHITE,
									fontWeight: '500',
									fontSize: 18,
								}}>
								#
							</Text>
						</View>
						<View style={{ width: '10%' }}></View>
						<View style={{ width: '61%' }}>
							<Text
								style={{
									color: Color.WHITE,
									fontWeight: '500',
									fontSize: 18,
								}}>
								Pseudo
							</Text>
						</View>
						<View style={{ width: '17%' }}>
							<Text
								style={{
									color: Color.WHITE,
									fontSize: 18,
									fontWeight: '500',
								}}>
								Votes
							</Text>
						</View>
					</View>
					<View
						style={{
							flex: 0.95,
							display: 'flex',
							flexDirection: 'column',
							gap: 5,
						}}>
						{topVotes.map((vote, index) => (
							<View
								key={vote.pseudo}
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-around',
								}}>
								<View
									style={{
										width: '12%',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
									}}>
									<Text
										style={{
											color: Color.WHITE,
											fontWeight: '500',
											fontSize: 16,
										}}>
										{index + 1}{' '}
									</Text>
									{index < 3 && (
										<MaterialIcons
											name='trophy'
											size={16}
											color={COLORS[index]}
										/>
									)}
								</View>
								<View
									style={{
										width: '10%',
										alignItems: 'center',
									}}>
									<Image
										source={{
											uri: vote.url.startsWith('https')
												? vote.url
												: `https://majestycraft.com/${vote.url}`,
										}}
										style={{ width: 20, height: 20 }}
									/>
								</View>
								<View style={{ width: '61%' }}>
									<Text
										style={{
											color: Color.WHITE,
											fontWeight: '500',
											fontSize: 15,
										}}>
										{vote.pseudo}
									</Text>
								</View>
								<View style={{ width: '17%' }}>
									<Text
										style={{
											color: Color.WHITE,
											fontWeight: '500',
											fontSize: 15,
										}}>
										{vote.nombre}
									</Text>
								</View>
							</View>
						))}
					</View>
				</View>
				<Footer />
			</ScrollView>
		</View>
	);
};
