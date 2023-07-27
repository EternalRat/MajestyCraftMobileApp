import { DrawerScreenProps } from '@react-navigation/drawer';
import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RootStackParamList, Routes } from '../domains/routing/routesName';
import { Color } from '../domains/templating/style';
import { VotesContext } from '../domains/Votes/Context';
import { VotesStore } from '../domains/Votes/types';

type Props = DrawerScreenProps<RootStackParamList, Routes.TOPVOTE>;

export const TopVotes = ({ navigation }: Props) => {
	const { topVoteurs } = useContext<VotesStore>(VotesContext);

	return (
		<View style={{ backgroundColor: Color.BLACK, flex: 1 }}>
			<Header navigation={navigation} />
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						top: 64,
					}}>
					<View
						style={{
							flex: 0.05,
							display: 'flex',
							flexDirection: 'row',
						}}>
						<View style={{ width: '33%' }}>
							<Text
								style={{
									color: Color.WHITE,
									textAlign: 'center',
								}}>
								#
							</Text>
						</View>
						<View style={{ width: '33%' }}>
							<Text
								style={{
									color: Color.WHITE,
									textAlign: 'center',
								}}>
								Pseudo
							</Text>
						</View>
						<View style={{ width: '33%' }}>
							<Text
								style={{
									color: Color.WHITE,
									textAlign: 'center',
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
						}}>
						{topVoteurs.map((vote, index) => (
							<View
								key={vote.pseudo}
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-around',
								}}>
								<View style={{ width: '33%' }}>
									<Text
										style={{
											color: Color.WHITE,
											textAlign: 'center',
										}}>
										{index + 1}
									</Text>
								</View>
								<View style={{ width: '33%' }}>
									<Text
										style={{
											color: Color.WHITE,
											textAlign: 'center',
										}}>
										{vote.pseudo}
									</Text>
								</View>
								<View style={{ width: '33%' }}>
									<Text
										style={{
											color: Color.WHITE,
											textAlign: 'center',
										}}>
										{vote.total_amount}
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
