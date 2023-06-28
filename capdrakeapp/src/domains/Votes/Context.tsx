import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';

import { MessageContext, MessageStore } from '../message/Context';
import { ActionTypeMessage } from '../message/types';
import { VoteService } from '../services/Vote';
import { votesReducer } from './reducer';
import { ActionTypeVotes, VotesDetails, VotesStore } from './types';

const defaultVotes: VotesStore = {
	votesStore: [],
};

export const VotesContext = createContext<VotesStore>(defaultVotes);

export const VotesWrapper = ({ children }: { children: React.ReactNode }) => {
	const [votesStore, dispatch] = useReducer(
		votesReducer,
		defaultVotes.votesStore
	);
	const { dispatch: dispatchMessage } =
		useContext<MessageStore>(MessageContext);

	useEffect(() => {
		VoteService.getAllVotesDetails()
			.then(result => {
				const { data } = result.data;
				const votes: VotesDetails[] = data.map((vote: any) => {
					return {
						id: parseInt(vote.id),
						title: vote.title,
						link: vote.link,
						timer: vote.timer,
						idCustom: vote.idCustom,
					} as VotesDetails;
				});
				dispatch({
					type: ActionTypeVotes.GET_ALL_VOTES_DETAILS,
					votes,
				});
			})
			.catch(() => {
				dispatchMessage({
					type: ActionTypeMessage.ADD_ERROR,
					code: "Récupération des liens impossible. Veuillez rédémarrer l'application.",
					duration: 3000,
				});
			});
	}, []);

	const value = useMemo(() => ({ votesStore }), [votesStore]);

	return (
		<VotesContext.Provider value={value}>{children}</VotesContext.Provider>
	);
};
