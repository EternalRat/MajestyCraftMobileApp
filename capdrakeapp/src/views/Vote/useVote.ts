/* eslint-disable indent */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { AuthContext } from '../../domains/auth/Context';
import { AuthStore } from '../../domains/auth/types';
import { MessageContext, MessageStore } from '../../domains/message/Context';
import { ActionTypeMessage } from '../../domains/message/types';
import { VotesDetails } from '../../domains/Votes/types';
import { allLinks } from './config';

interface HasVoted {
	hasVoted: boolean;
	linkId: number;
	link: string;
}

export const useVote = () => {
	const { authStore } = useContext<AuthStore>(AuthContext);
	const { dispatch: dispatchMessage } =
		useContext<MessageStore>(MessageContext);
	const [hasVoted, setHasVoted] = useState<HasVoted>({
		hasVoted: false,
		linkId: -1,
		link: '',
	});
	const [username, setUsername] = useState<string>(authStore.username);

	useEffect(() => {
		let interval = setInterval(async () => {
			if (authStore.ip && hasVoted.hasVoted) {
				const voteLinkInfo = allLinks.find(link =>
					hasVoted.link.includes(link.base)
				);
				if (voteLinkInfo) {
					const res = await axios.get(
						`${voteLinkInfo.checkVote
							.replace(':ip', authStore.ip)
							.replace(':id', hasVoted.linkId.toString())}`
					);
					const data = await res.data;
					if (voteLinkInfo.hasVoted(data)) {
						
					}
				}
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const handleVote =
		({ link, id }: VotesDetails) =>
		async () => {
			const supported = await Linking.canOpenURL(link);

			if (supported) {
				setHasVoted({
					hasVoted: true,
					linkId: id,
					link: link,
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
