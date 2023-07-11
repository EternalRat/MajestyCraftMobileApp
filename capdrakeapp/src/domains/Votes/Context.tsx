import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
} from 'react';

import { AuthContext } from '../auth/Context';
import { AuthStore } from '../auth/types';
import { MessageContext, MessageStore } from '../message/Context';
import { ActionTypeMessage } from '../message/types';
import { VoteService } from '../services/Vote';
import { votesReducer } from './reducer';
import { ActionTypeVotes, VotesDetails, VotesStore } from './types';
import { userVotesReducer } from './User/reducer';
import { ActionTypeUserVotes, UserVoteDetail } from './User/types';

const defaultVotes: VotesStore = {
	votesStore: [],
	userVotes: [],
};

export const VotesContext = createContext<VotesStore>(defaultVotes);

export const VotesWrapper = ({ children }: { children: React.ReactNode }) => {
	const [votesStore, dispatch] = useReducer(
		votesReducer,
		defaultVotes.votesStore
	);
	const [userVotes, dispatchUserVotes] = useReducer(
		userVotesReducer,
		defaultVotes.userVotes
	);
	const { dispatch: dispatchMessage } =
		useContext<MessageStore>(MessageContext);
	const { authStore } = useContext<AuthStore>(AuthContext);

	useEffect(() => {
		VoteService.getAllVotesDetails()
			.then(result => {
				const { data } = result.data;
				const votes: VotesDetails[] = data.map((vote: any) => {
					return {
						id: parseInt(vote.id),
						serveur: vote.serveur,
						action: vote.action,
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

	useEffect(() => {
		if (authStore.username !== '') {
			VoteService.getAllUserVotes(authStore.username)
				.then(result => {
					const { data } = result.data;
					const votes: UserVoteDetail[] = data.map((vote: any) => {
						return {
							id: parseInt(vote.id),
							date_dernier: parseInt(vote.date_dernier),
							ip: vote.ip,
							isOld: parseInt(vote.isOld),
							nbre_votes: parseInt(vote.nbre_votes),
							pseudo: vote.pseudo,
							site: vote.site,
						} as UserVoteDetail;
					});
					dispatchUserVotes({
						type: ActionTypeUserVotes.GET_ALL_VOTES_DETAILS,
						votes,
					});
				})
				.catch(() => {
					dispatchMessage({
						type: ActionTypeMessage.ADD_ERROR,
						code: "Récupération des données utilisateurs impossibles. Veuillez rédémarrer l'application.",
						duration: 3000,
					});
				});
		}
	}, [authStore.username]);

	const value = useMemo(
		() => ({ votesStore, userVotes }),
		[votesStore, userVotes]
	);

	return (
		<VotesContext.Provider value={value}>{children}</VotesContext.Provider>
	);
};
