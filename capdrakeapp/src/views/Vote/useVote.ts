/* eslint-disable indent */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios, { HttpStatusCode } from 'axios';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../domains/auth/Context';
import { AuthStore } from '../../domains/auth/types';
import { MessageContext, MessageStore } from '../../domains/message/Context';
import { ActionTypeMessage, MessageType } from '../../domains/message/types';
import { RootStackParamList, Routes } from '../../domains/routing/routesName';
import { VoteService } from '../../domains/services/Vote';
import { VotesContext } from '../../domains/Votes/Context';
import { VotesDetails, VotesStore } from '../../domains/Votes/types';
import { allLinks } from './config';

export interface Votes {
	hasVoted: boolean;
	linkId: number;
	customId: string;
	link: string;
	action: string;
	serveur: number;
}

export interface RunningVotes {
	linkId: number;
}

export const useVote = () => {
	const { authStore } = useContext<AuthStore>(AuthContext);
	const { dispatch: dispatchMessage } =
		useContext<MessageStore>(MessageContext);
	const [votes, setVotes] = useState<Votes[]>([]);
	const [isVoting, setIsVoting] = useState<RunningVotes[]>([]);
	const { refreshUserVotes } = useContext<VotesStore>(VotesContext);
	const [username, setUsername] = useState<string>(authStore.username);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList, Routes>>();

	useEffect(() => {
		let interval = setInterval(async () => {
			if (authStore.ip) {
				for (const vote of votes) {
					if (isVoting.find(v => v.linkId === vote.linkId)) continue;
					setIsVoting(prev => [...prev, { linkId: vote.linkId }]);
					try {
						const voteLinkInfo = allLinks.find(link =>
							vote.link.includes(link.base)
						);
						if (voteLinkInfo) {
							try {
								await VoteService.createVote(
									vote.linkId,
									username,
									Date.now() / 1000,
									authStore.ip
								);
								refreshUserVotes();
								const res = await axios.get(
									`${voteLinkInfo.checkVote
										.replace(':ip', authStore.ip)
										.replace(':id', vote.customId)
										.replace(':username', username)}`,
									{ timeout: 10000 }
								);
								const data = res.data;
								if (voteLinkInfo.hasVoted(data)) {
									try {
										const res = await VoteService.stockVote(
											vote,
											username
										);
										const status = res.status;
										if (status === HttpStatusCode.Ok) {
											dispatchMessage({
												message: `Merci pour votre vote !`,
												typeMessage:
													MessageType.SUCCESS,
												duration: 3000,
												type: ActionTypeMessage.ADD_GENERIC_MESSAGE,
											});
										} else {
											dispatchMessage({
												code: `Une erreur est survenue lors de l'enregistrement de votre vote.`,
												duration: 3000,
												type: ActionTypeMessage.ADD_ERROR,
											});
										}
										setVotes(prev =>
											prev.filter(
												v => v.linkId !== vote.linkId
											)
										);
										setIsVoting(prev =>
											prev.filter(
												v => v.linkId !== vote.linkId
											)
										);
									} catch (err) {
										console.error(err);
									}
								}
							} catch (err) {
								console.error(err);
							}
						}
					} catch (err) {
						console.error(err);
					}
				}
			}
		}, 5000);
		return () => clearInterval(interval);
	}, [votes, isVoting]);

	const handleVote =
		({ link, id, action, serveur, idCustom }: VotesDetails) =>
		async () => {
			if (!votes.find(vote => vote.linkId === id)) {
				setVotes(prev => [
					...prev,
					{
						hasVoted: true,
						linkId: id,
						customId: idCustom,
						link,
						action,
						serveur,
					},
				]);
				navigation.navigate(Routes.VOTESITE, { voteUrl: link });
			} else {
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: 'Ouverture du lien impossible, veuillez réessayer.',
					duration: 3000,
				});
			}
		};

	return {
		handleVote,
		username,
		setUsername,
		isVoting,
	};
};
