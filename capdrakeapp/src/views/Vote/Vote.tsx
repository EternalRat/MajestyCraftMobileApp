/* eslint-disable indent */
import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Images from '../../../images/Images';
import { Files } from '../../../images/ImagesTypes';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { RootStackParamList, Routes } from '../../domains/routing/routesName';
import { Button } from '../../domains/templating/buttons/Button';
import { Input } from '../../domains/templating/input/TextInput';
import { Color } from '../../domains/templating/style';
import { Label } from '../../domains/templating/texts/Label';
import { VotesContext } from '../../domains/Votes/Context';
import { VotesStore } from '../../domains/Votes/types';
import { useVote } from './useVote';

dayjs.extend(duration);

type Props = DrawerScreenProps<RootStackParamList, Routes.VOTE>;

interface Timer {
	id: number;
	active: boolean;
	timer: number;
}

export const Vote = ({ navigation }: Props) => {
	const { votesStore, userVotes } = useContext<VotesStore>(VotesContext);
	const { handleVote, username, setUsername, isVoting } = useVote();
	const [timer, setTimer] = useState<Timer[]>(Array(3));
	const [timerLoaded, setTimerLoaded] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			let index = 0;
			for (const userVote of userVotes) {
				setTimer(prev => {
					const state = [...prev];
					state[index] = {
						id: userVote.site,
						active:
							(userVote.date_dernier ?? 0) +
								votesStore.find(
									voteStore => voteStore.id === userVote.site
								)!.timer >
							Date.now() / 1000,
						timer:
							(userVote.date_dernier ?? 0) +
							votesStore.find(
								voteStore => voteStore.id === userVote.site
							)!.timer -
							parseInt((Date.now() / 1000).toString()),
					};
					return state;
				});
				index++;
			}
			if (!timerLoaded) {
				setTimerLoaded(true);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [userVotes, votesStore]);

	return (
		<View style={{ backgroundColor: Color.BLACK, flex: 1 }}>
			<Header navigation={navigation} />
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View
					style={{
						flex: 0.5,
						justifyContent: 'flex-end',
						alignSelf: 'center',
						bottom: 24,
					}}>
					<Label style={{ color: Color.WHITE }}>
						Pseudo IN GAME (EXACT)
					</Label>
					<Input
						value={username}
						updateText={e => setUsername(e.nativeEvent.text)}
						icon={Images[Files.user]}
						style={{ color: Color.WHITE }}
					/>
				</View>
				{votesStore.length > 0 ? (
					<View
						style={{
							flex: 0.5,
							gap: 15,
							width: '70%',
							alignSelf: 'center',
						}}>
						{timerLoaded ? (
							votesStore.map(vote => {
								return (
									<View key={vote.id}>
										<Button
											disabled={
												(timer.find(
													time =>
														time &&
														time.id === vote.id
												) &&
												timer.find(
													time => time.id === vote.id
												)!.active
													? true
													: username.length === 0) ||
												isVoting.find(
													currentVote =>
														currentVote.linkId ===
														vote.id
												) !== undefined
											}
											style={{
												width: '100%',
												backgroundColor:
													(timer.find(
														time =>
															time &&
															time.id === vote.id
													) &&
														timer.find(
															time =>
																time.id ===
																vote.id
														)!.active) ||
													username.length === 0
														? Color.BORDER
														: Color.ORANGE ||
														  isVoting.find(
																currentVote =>
																	currentVote.linkId ===
																	vote.id
														  ) !== undefined,
												height: 40,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												borderRadius: 5,
											}}
											onClick={handleVote(vote)}>
											{timer.find(
												time =>
													time && time.id === vote.id
											) &&
											timer.find(
												time => time.id === vote.id
											)!.active
												? `Vous pourrez revoter dans ${dayjs
														.duration(
															timer.find(
																time =>
																	time &&
																	time.id ===
																		vote.id
															)!.timer,
															'seconds'
														)
														.format('HH:mm:ss')}`
												: vote.title}
										</Button>
									</View>
								);
							})
						) : (
							<View style={{ flex: 1, justifyContent: 'center' }}>
								<Label
									style={{
										color: Color.WHITE,
										textAlign: 'center',
									}}>
									Récupération des données en cours...
								</Label>
							</View>
						)}
					</View>
				) : (
					<View style={{ flex: 1, justifyContent: 'center' }}>
						<Label
							style={{ color: Color.WHITE, textAlign: 'center' }}>
							Une erreur est survenue et aucun moyen de vote n'a
							été récupéré. Veuillez passer par le site, réessayer
							plus tard ou contacter le développeur ou les
							administrateurs.
						</Label>
					</View>
				)}
				<Footer />
			</ScrollView>
		</View>
	);
};
