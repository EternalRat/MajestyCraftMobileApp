/* eslint-disable indent */
import axios, { HttpStatusCode } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { AuthContext } from '../../domains/auth/Context';
import { AuthStore } from '../../domains/auth/types';
import { MessageContext, MessageStore } from '../../domains/message/Context';
import { ActionTypeMessage, MessageType } from '../../domains/message/types';
import { VoteService } from '../../domains/services/Vote';
import { VotesContext } from '../../domains/Votes/Context';
import { VotesDetails, VotesStore } from '../../domains/Votes/types';
import { allLinks } from './config';

export interface HasVoted {
	hasVoted: boolean;
	linkId: number;
	customId: string;
	link: string;
	action: string;
	serveur: number;
}

export const useVote = () => {
	const { authStore } = useContext<AuthStore>(AuthContext);
	const { dispatch: dispatchMessage } =
		useContext<MessageStore>(MessageContext);
	const [hasVoted, setHasVoted] = useState<HasVoted>({
		hasVoted: false,
		linkId: -1,
		customId: '',
		link: '',
		action: '',
		serveur: -1,
	});
	const { refreshUserVotes } = useContext<VotesStore>(VotesContext);
	const [username, setUsername] = useState<string>(authStore.username);

	useEffect(() => {
		let interval = setInterval(async () => {
			if (authStore.ip && hasVoted.hasVoted) {
				try {
					const voteLinkInfo = allLinks.find(link =>
						hasVoted.link.includes(link.base)
					);
					if (voteLinkInfo) {
						const res = await axios.get(
							`${voteLinkInfo.checkVote
								.replace(':ip', authStore.ip)
								.replace(':id', hasVoted.customId)
								.replace(':username', username)}`
						);
						const data = res.data;
						if (voteLinkInfo.hasVoted(data)) {
							try {
								await VoteService.createVote(
									hasVoted.linkId,
									username,
									Date.now() / 1000,
									authStore.ip
								);
								if (username === authStore.username) {
									try {
										const res = await VoteService.stockVote(
											hasVoted,
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
											refreshUserVotes();
										} else {
											dispatchMessage({
												code: `Une erreur est survenue lors de l'enregistrement de votre vote.`,
												duration: 3000,
												type: ActionTypeMessage.ADD_ERROR,
											});
										}
										setHasVoted({
											action: '',
											hasVoted: false,
											link: '',
											linkId: -1,
											customId: '',
											serveur: -1,
										});
									} catch (err) {
										console.error(err);
									}
								}
							} catch (err) {
								console.error(err);
							}
						}
					}
				} catch (err) {
					console.error(err);
				}
			}
		}, 5000);
		return () => clearInterval(interval);
	}, [hasVoted]);

	const handleVote =
		({ link, id, action, serveur, idCustom }: VotesDetails) =>
		async () => {
			const supported = await Linking.canOpenURL(link);

			if (supported) {
				setHasVoted({
					hasVoted: true,
					linkId: id,
					customId: idCustom,
					link,
					action,
					serveur,
				});
				await Linking.openURL(link);
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
	};
};
